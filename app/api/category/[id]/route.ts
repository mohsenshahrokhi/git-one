import { getCategory, updateCategory, deleteCategory } from "@/lib/controllers/categoryController"
import { verifyJwt } from "@/lib/jwt"

import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: any) => {
    // const accessToken = req.headers.get('Authorization')
    // const verify = accessToken && verifyJwt(accessToken!) || null
    // if (accessToken && verify?.role === "مدیر کل") {
    try {
        const { id } = params
        const category = await getCategory(id)
        return NextResponse.json({ message: 'ok', category }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error' }, { status: 500 })
    }
    // } else {
    //     return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });

    // }
}

export const PATCH = async (req: Request, { params }: any) => {
    const accessToken = req.headers.get('Authorization')
    const verify = accessToken && verifyJwt(accessToken!) || null
    if (accessToken && verify?.role === "مدیر کل") {
        try {
            const { data } = await req.json()
            const { id } = params
            const category = await updateCategory(id, { data })
            return NextResponse.json({ message: 'ok', category }, { status: 200 })
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
            const category = await deleteCategory(id)
            return NextResponse.json({ message: "Success", category }, { status: 201 })
        } catch (err) {
            return NextResponse.json({ message: "Error", err }, { status: 500 })
        }
    } else {
        return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });

    }
}
