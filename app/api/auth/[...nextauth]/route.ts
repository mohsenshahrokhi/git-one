import { getUserByEmail } from "@/lib/controllers/userController"
import { signJwtAccessToken } from "@/lib/jwt"
import connectToMongodb from "@/lib/mongodb"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string; password: string }
                connectToMongodb()
                const user = await getUserByEmail(email)
                if (!user) throw Error('email/password mismatch')
                // const passwordMatch = await user.comparePassword(password)
                const passwordMatch = await bcrypt.compare(password, user.password)
                if (!passwordMatch) throw Error('email/password mismatch')
                const accessToken = signJwtAccessToken(user)
                return {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    accessToken: accessToken
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (trigger === 'update' && session?.name) {
                token.name = session.name
            }
            if (user) {
                return {
                    ...token,
                    ...user
                }
            }
            return token
        },
        async session({ session, token, user }) {
            session.user = token as any
            return session
        }
    },
    secret: process.env.NEXTAUTH_CECRET,
    pages: {
        signIn: '/login',
        signOut: '/',
    }

}

const authHandler = NextAuth(authOptions)
export { authHandler as GET, authHandler as POST }