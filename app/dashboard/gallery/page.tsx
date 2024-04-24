'use client'

import React, { useCallback, useEffect, useState } from 'react'
import CategoryForm from "@/components/adminComponent/Categories/CategoryForm"
import axios from 'axios'
import Link from 'next/link'
import { HiMiniPlus, HiOutlinePencilSquare, HiOutlinePhoto, HiOutlineTrash } from 'react-icons/hi2'
import { Tooltip } from 'react-tooltip'
import TERipple from '@/components/ui/components/Ripple/Ripple'
import TEMModal from '@/components/ui/components/Modal/TEMModal'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CAT, GalleryInfoProps } from '@/type'
import Image from 'next/image'
import Checkbox from '@/components/ui/components/Checkbox/Checkbox'
import HModal from "@/components/ui/components/Modal2/confirmModal";
import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'
import LinkWithRipple from '@/components/ui/components/Button/LinkWithRipple'
import queryString from 'query-string'


function Gallery() {
    const router = useRouter()

    const [gallerys, setGallerys] = useState<GalleryInfoProps[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selected, setSelected] = useState<string[]>([])

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const accessToken = session?.user && session?.user?.accessToken || ''

    const getAllGallery = useCallback(async () => {
        const parsed = {

        }
        const stringified = queryString.stringify(parsed);
        accessToken && await axios.get(`/api/gallery?${stringified}`, {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {
            const cats = response.data.gallerys
            setGallerys(cats)
        })
    }, [accessToken])

    useEffect(() => {
        getAllGallery()
    }, [getAllGallery])

    function handleSelected(image: string) {
        let newForm = [...selected]
        if (newForm.includes(image)) {
            const oldImg = newForm.filter(old => old !== image)
            newForm = oldImg
        } else {
            newForm.push(image)
        }
        setSelected(newForm)
    }

    function closeModal() {
        setIsOpen(false)
        setSelected([])
    }

    async function deleteP() {
        // selected.map((id) => {

        await axios.get('/api/gallery/', {
            params: {
                IDs: selected
            }
        })
        // })
        setIsOpen(false)
    }

    // console.log(gallerys);


    return (
        <div className="flex flex-col w-full">
            <section className="flex relative overflow-y-auto flex-col w-full p-1 my-2">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                        فایل های بارگذاری شده
                    </h2>
                    <HModal
                        open={isOpen}
                        close={closeModal}
                        title='حذف عکس'
                        body='آیا از حذف موارد انتخاب شده اطمینان دارید'
                    >
                        <div
                            className=" flex w-full justify-around items-center">
                            <TERipple rippleColor="white">

                                <button
                                    onClick={closeModal}
                                    className=" bg-slate-300 text-center justify-center items-center text-slate-600 py-1 px-4 rounded shadow-sm">خیر</button>
                            </TERipple>

                            <button
                                onClick={deleteP}
                                className="text-slate-100 py-1 px-4 rounded shadow-sm bg-red-600 text-center justify-center items-center">
                                {!isLoading ? <span>بله حذف شود</span> : <span>Deleting...</span>}
                            </button>

                        </div>
                    </HModal>
                    {selected.length > 0 && <ButtonWithRipple
                        name='colorIcon'
                        onClick={() => setIsOpen(true)}
                    >
                        انتخاب عکس
                    </ButtonWithRipple>}
                    <div className="flex items-center mt-4 gap-x-3">

                        {/* <TERipple rippleColor="white"> */}
                        <LinkWithRipple
                            name="addProduct"
                            href={'/dashboard/gallery/addFile'}
                        >
                            <span>بارگذاری کردن فایل جدید</span>
                            {/* <HiMiniPlus /> */}
                            <Tooltip anchorSelect="#addProduct" clickable>
                                <button>بارگذاری کردن فایل جدید</button>
                            </Tooltip>
                        </LinkWithRipple>
                        {/* </TERipple> */}

                    </div>
                </div>

                <div className="flex flex-col mt-2">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className=" grid grid-cols-4 md:grid-cols-12 p-5 gap-2 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                {gallerys.length > 0 && gallerys.map((galler) => (
                                    <div
                                        className='flex'
                                        key={galler._id}>
                                        <div className=" flex text-center justify-center">
                                            <div className="flex flex-col border">
                                                <div className="p-2 md:flex-shrink-0">

                                                    <TERipple>

                                                        <div className="relative overflow-hidden bg-cover bg-no-repeat">
                                                            <Image
                                                                src={`/uploads/images/${galler.url}`}
                                                                width="148"
                                                                height="199"
                                                                priority={true}
                                                                alt={galler.title}
                                                                className="rounded-lg"
                                                            />
                                                            <div
                                                                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                                            <div className=' absolute right-1 top-1'>
                                                                <Checkbox
                                                                    id={galler._id}
                                                                    checked={false}
                                                                    setCheck={() => handleSelected(galler.url)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </TERipple>
                                                </div>

                                                {/* <div className="mt-4">
                                                    <div className="uppercase text-sm text-indigo-500 font-bold">
                                                        {galler.title}
                                                    </div>

                                                </div> */}
                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className="flex items-center justify-between mt-6">
                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span>
                            قبلی
                        </span>
                    </a>

                    <div className="items-center hidden md:flex gap-x-3">
                        <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                    </div>

                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <span>
                            بعدی
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </a>
                </div> */}
            </section>

            {/*  <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-right text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">نام دسته بندی</th>
                                        <th scope="col" className="px-6 py-4">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gallerys?.length > 0 && gallerys.map((category) => (

                                        <tr
                                            key={category.id}
                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{category.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">Mark</td>

                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> */}

        </div >
    )
}

export default Gallery