import { deleteGallery, getAllGallery, uploadGalleryImages } from "@/lib/controllers/galleryController"
import { verifyJwt } from "@/lib/jwt";
import fs from "fs";
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: NextResponse) => {
    const accessToken = req.headers.get('Authorization')
    const verify = accessToken && verifyJwt(accessToken!) || null
    if (accessToken && verify?.role === "مدیر کل") {
        const urls = req.url.split('IDs%5B%5D=')
        urls.shift()
        if (urls?.length > 0) {
            try {
                const product = await deleteGallery(urls)
                return NextResponse.json({ message: "Success", product }, { status: 201 })
            } catch (err) {
                return NextResponse.json({ message: "Error", err }, { status: 500 })
            }
        } else {
            try {
                const gallerys = await getAllGallery(req)
                return NextResponse.json({ message: "Success", gallerys }, { status: 200 })
            } catch (err) {
                return NextResponse.json({ message: "Error", err }, { status: 500 })
            }
        }
    } else {
        return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });
    }
}

export const POST = async (req: Request) => {
    const accessToken = req.headers.get('Authorization')
    const verify = accessToken && verifyJwt(accessToken!) || null
    if (accessToken && verify?.role === "مدیر کل") {
        try {
            const formData = await req.formData();
            const formDataEntryValues = Array.from(formData.values())

            for (const formDataEntryValue of formDataEntryValues) {
                if (
                    typeof formDataEntryValue === "object" &&
                    "arrayBuffer" in formDataEntryValue
                ) {
                    const fil = formDataEntryValue as unknown as Blob
                    const buffer = Buffer.from(await fil.arrayBuffer())
                    const newUrl = `${Date.now()}-${fil.name.trim().replace(/[&\// /\\#,+()$~%@'":*?<>{}]/g, '')}`
                    fs.writeFileSync(`public/uploads/images/${newUrl}`, buffer)
                    await uploadGalleryImages({ title: fil.name, url: newUrl })
                }
            }
            return NextResponse.json({ message: 'ok' }, { status: 200 })
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
            console.log(id);

            const product = await deleteGallery(id)
            return NextResponse.json({ message: "Success", product }, { status: 201 })
        } catch (err) {
            return NextResponse.json({ message: "Error", err }, { status: 500 })
        }
    } else {
        return NextResponse.json({ message: "Error UnAuthorization" }, { status: 401 });

    }
}
