import { NextResponse, URLPattern } from "next/server"
import { createProduct, getAllProducts } from '@/lib/controllers/invoiceController'
import { verifyJwt } from "@/lib/jwt"
import { MongooseQueryParser } from 'mongoose-query-parser'

export const GET = async (req: Request, res: NextResponse) => {
    try {
        const products = await getAllProducts(req)
        return NextResponse.json({ message: "Success", qtt: products.length, products }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export const POST = async (req: Request, res: NextResponse) => {
    const accessToken = req.headers.get('Authorization')
    const verify = accessToken && verifyJwt(accessToken!) || null
    if (accessToken && verify?.role === "مدیر کل") {
        try {
            const { data } = await req.json()
            const product = await createProduct(data)
            return NextResponse.json({ message: "Success", product }, { status: 201 })
        } catch (err) {
            return NextResponse.json({ message: "Error", err }, { status: 500 })
        }
    } else {
        return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });

    }
}
