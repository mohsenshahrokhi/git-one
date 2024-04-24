import { NextResponse } from "next/server"
import { getAllUsers, getUserByEmail, registerUser } from '@/lib/controllers/userController'
import { verifyJwt } from "@/lib/jwt"
import { NewResponse, NewUserRequest } from "@/type"
import bcrypt from 'bcrypt'

export const GET = async (req: Request, res: NextResponse) => {
    const accessToken = req.headers.get('Authorization')
    const verify = accessToken && verifyJwt(accessToken!) || null
    if (accessToken && verify?.role === "مدیر کل") {
        try {
            const users = await getAllUsers(req)
            return NextResponse.json({ message: "Success", users }, { status: 200 });
        } catch (err) {
            return NextResponse.json({ message: "Error", err }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });

    }
}

export const POST = async (req: Request): Promise<NewResponse> => {
    const { form } = (await req.json()) as NewUserRequest
    const oldUser = await getUserByEmail(form.email)
    console.log('oldUser', oldUser);

    if (oldUser._id) {
        return NextResponse.json({ message: 'failed to create a new product', error: 'failed to create a new product' }, { status: 422 })
    }
    // try {
    const salt = await bcrypt.genSalt(10)
    const newPass = await bcrypt.hash(form.password, salt)
    // const userWithuotePass = { password, form }
    form.password = newPass
    const user = await registerUser({ ...form })
    return NextResponse.json({
        message: "Success",
        user: {
            id: user._id,
            mobile: user.mobile,
            name: user.name,
            email: user.email,
            role: user.role
        }
    },
        { status: 201 }
    )
    // } catch (err) {
    //     return NextResponse.json({ message: "Error", err }, { status: 500 });
}

// export const POST = async (req: Request, res: NextResponse) => {
//     const accessToken = req.headers.get('Authorization')
//     const verify = accessToken && verifyJwt(accessToken!) || null
//     if (accessToken && verify?.role === "مدیر کل") {
//         try {
//             const { data } = await req.json()
//             const user = await registerUser(data)
//             return NextResponse.json({ message: "Success", user }, { status: 201 })
//         } catch (err) {
//             return NextResponse.json({ message: "Error", err }, { status: 500 })
//         }
//     } else {
//         return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });

//     }
// }
