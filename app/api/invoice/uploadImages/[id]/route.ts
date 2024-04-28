import { uploadProductImages } from "@/prisma/controllers/productController";
import fs from "fs";
import { NextResponse } from "next/server"

export const PATCH = async (req: Request, { params }: any) => {
    try {

        const { id } = params

        const urls = []

        const formData = await req.formData();
        const formDataEntryValues = Array.from(formData.values());
        for (const formDataEntryValue of formDataEntryValues) {
            if (
                typeof formDataEntryValue === "object" &&
                "arrayBuffer" in formDataEntryValue
            ) {
                const fil = formDataEntryValue as unknown as Blob;
                const buffer = Buffer.from(await fil.arrayBuffer());
                fs.writeFileSync(`public/uploads/${Date.now()}-${fil.name}`, buffer);
                urls.push(`${fil.name}`)
            }
        }

        const product = await uploadProductImages(id, { images: urls })

        return NextResponse.json({ message: 'ok', product }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error' }, { status: 500 })
    }
}
