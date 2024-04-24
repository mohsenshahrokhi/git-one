'use client'

import { GalleryInfoProps } from "@/type"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { HiOutlineArrowUpTray } from "react-icons/hi2"


function Gallery() {

    const router = useRouter()

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const accessToken = session?.user && session?.user?.accessToken || ''

    const [galleryInfo, setGalleryInfo] = useState<GalleryInfoProps>()

    const [images, setImages] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)



    function onChange(e: React.ChangeEvent<HTMLInputElement>) {

        if (e.target.files) {
            // convert `FileList` to `File[]`
            const _files = Array.from(e.target.files);
            setImages(_files);
        }

    }

    useEffect(() => {

        axios.get(`/api/product/`).then((response) => {
            setGalleryInfo(response.data.product)
        })

    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        images.forEach((image, i) => {
            formData.append(image.name, image)
        });
        // console.log(formData);

        setUploading(true)

        await axios.post("/api/gallery/", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${accessToken}`
                }
            }
        )
        setUploading(false)
        router.push('/dashboard/gallery')
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
                            accept="image/*"
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

            {/* {galleryInfo.image && galleryInfo.image.length !== 0 ? <span>سلام</span> : <span>برای این محصول عکسی ثبت نشده</span>} */}


        </div>
    )
}

export default Gallery