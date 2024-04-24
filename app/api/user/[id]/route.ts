import { getUserById, updateUser, deleteUser } from "@/lib/controllers/userController"
import { verifyJwt } from "@/lib/jwt"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: any) => {
    const accessToken = req.headers.get('Authorization')
    const verify = accessToken && verifyJwt(accessToken!) || null
    if (accessToken && verify?.role === "مدیر کل") {
        try {
            const { id } = params
            const user = await getUserById(id)
            return NextResponse.json({ message: 'ok', user }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: 'error' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });
    }
}

export const PATCH = async (req: Request, { params }: any) => {
    const accessToken = req.headers.get('Authorization')
    const verify = accessToken && verifyJwt(accessToken!) || null
    if (accessToken && verify?.role === "مدیر کل") {
        try {
            const { form } = await req.json()
            const { id } = params
            const user = await updateUser(id, { form })
            return NextResponse.json({ message: 'ok', user }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: 'error' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });
    }
}

export const DELETE = async (req: Request, { params }: any) => {
    const accessToken = req.headers.get('Authorization')
    const verify = accessToken && verifyJwt(accessToken!) || null
    if (accessToken && verify?.role === "مدیر کل") {
        try {
            const { id } = params
            const user = await deleteUser(id)
            return NextResponse.json({ message: "Success", user }, { status: 201 })
        } catch (err) {
            return NextResponse.json({ message: "Error", err }, { status: 500 })
        }
    } else {
        return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });
    }
}
