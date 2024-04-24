import { NextResponse } from "next/server"
import { createProduct, getAllProducts } from '@/lib/controllers/productController'
import { verifyJwt } from "@/lib/jwt"

export const GET = async (req: Request, res: NextResponse) => {
    try {
        // const query = req.url.split('?')[1]
        // const ob = query.split('&')
        // const url = new URL(req.url)
        // const kyes = url.searchParams.getAll('')

        // const all: any = {}
        // let outPut: any = {}

        // ob.map((o) => {
        //     let x = o.split('=')
        //     Object.assign(all, { [x[0]]: x[1] })
        // })
        // let prop = ''
        // for (let kye in all) {
        //     if (!kye.match(/\b(gt|gte|lt|lte)/)) {
        //         outPut[kye] = all[kye]

        //     } else {
        //         prop = kye.split('[')[0]
        //         let operator = kye.match(/\[(.*)]/)![1]

        //         if (!outPut[prop]) {
        //             outPut[prop] = {}
        //         }
        //         outPut[prop][`$${operator}`] = all[kye]
        //     }

        // }

        const products = await getAllProducts(req)

        // const selectCategory = req.url.split('?')

        // if (selectCategory.length > 1) {
        //     params = selectCategory[1].split('&')
        //     const query: string[] = []
        //     for (let index = 0; index < params.length; index++) {
        //         query.push(params[index].split('=')[1].replace('%3E', '>'));

        //     }
        //     console.log('aaa', selectCategory, params, query);
        //     products = await getAllProductsByCategory(query)

        // } else {
        //     products = await getAllProducts()
        // }
        // console.log('params', query)

        return NextResponse.json({ message: "Success", products }, { status: 200 });
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
