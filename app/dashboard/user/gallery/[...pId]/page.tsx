'use client'

import axios from "axios"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { HiOutlineArrowUpTray } from "react-icons/hi2"

type Props = {
    pId: string
}

type ProductInfoProps = {
    title: string
    description: string
    price: string
    image: string[]

}

function ProductGallery({ }: Props) {

    const router = useRouter()

    const { pId } = useParams<Props>()

    const [productInfo, setProductInfo] = useState<ProductInfoProps>({
        title: '',
        description: '',
        price: '',
        image: [],
    })

    const [images, setImages] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)

    useEffect(() => {

        axios.get(`/api/product/${pId}`).then((response) => {
            setProductInfo(response.data.product)
        })

    }, [pId])

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {

        if (e.target.files) {
            //convert `FileList` to `File[]`
            const _files = Array.from(e.target.files);
            setImages(_files);
        }

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        images.forEach((image, i) => {
            formData.append(image.name, image)
        });
        setUploading(true)
        await axios.patch("/api/product/uploadImages/" + pId, formData)
        // await axios.post("/api/product/uploadImages", formData)
        setUploading(false)
        router.push('/dashboard/product')
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >

                <div className=' flex flex-col'>
                    <label className=" flex mb-2 text-sm font-medium text-gray-900 dark:text-white">آلبوم عکس محصول</label>
                    <label className=" cursor-pointer w-24 h-24 flex flex-col p-1 border-2 justify-center items-center text-sm text-center border-sky-300 bg-sky-600 rounded-lg text-white">
                        <HiOutlineArrowUpTray size={24} className=' flex mx-auto mb-2' />
                        بارگذاری
                        <input
                            accept="image/png, image/jpeg"
                            onChange={onChange}
                            type="file"
                            multiple
                            required
                            name="image"
                            className=" hidden"
                        />
                    </label>
                    <div className=" flex gap-2 justify-between items-center w-full h-full my-2">
                        <div className=" flex gap-2 my-2">
                            {images.map((image) => {
                                const src = URL.createObjectURL(image);
                                return (
                                    <div className="relative aspect-video col-span-4" key={image.name}>
                                        <Image
                                            src={src}
                                            alt={image.name}
                                            width={220}
                                            height={150}
                                            priority={true}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className=" flex px-2 py-3 rounded-md bg-sky-700 text-white"
                >
                    {
                        uploading ? <span>در حال بارگذاری ...</span> : <span>بارگذاری</span>
                    }
                </button>
            </form>

            {productInfo.image && productInfo.image.length !== 0 ? <span>سلام</span> : <span>برای این محصول عکسی ثبت نشده</span>}


        </div>
    )
}

export default ProductGallery