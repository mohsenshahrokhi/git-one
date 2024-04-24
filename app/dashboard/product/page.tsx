'use client'

import { HiMiniPlus, HiOutlinePencilSquare, HiOutlinePhoto, HiOutlineTrash } from "react-icons/hi2";
import React, { useCallback, useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import axios from "axios"
import Link from "next/link"
import TERipple from "@/components/ui/components/Ripple/Ripple"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { PRODUCT } from "@/type"
import { useRouter } from "next/navigation"

import HModal from "@/components/ui/components/Modal2/confirmModal";
import ButtonWithRipple from "@/components/ui/components/Button/ButtonWithRipple";
import LinkWithRipple from "@/components/ui/components/Button/LinkWithRipple";
import queryString from "query-string"

export default function Product() {

    const router = useRouter()

    const [deleteProduct, setDeleteProduct] = useState<PRODUCT>()

    const [isLoading, setIsLoading] = useState(false)

    const [products, setProducts] = useState<PRODUCT[]>([])

    let [isOpen, setIsOpen] = useState(false)

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const product = {
        category: 0,
        description: '',
        images: [],
        price: 0,
        discount: 0,
        propertys: [{ title: '', value: { value: '', name: '' } }],
        ratings: '',
        recipe: '',
        reviews: [],
        seller: { _id: '' },
        author: { _id: '' },
        slug: '',
        title: '',
        stock: 0,
    }

    // const query = queryString.stringify(product)

    const accessToken = session?.user && session?.user?.accessToken || ''

    const getAllProducts = useCallback(async () => {
        const parsed = {
            populate: 'category.name,category.images,seller.name,author.name'
        }
        const stringified = queryString.stringify(parsed);
        await axios.get(`/api/product?${stringified}`).then(response => {
            setProducts(response.data.products)
        })
    }, [])

    useEffect(() => {
        getAllProducts()
    }, [getAllProducts])

    function deleteP(id: string | undefined) {
        setIsLoading(true)
        axios.delete('/api/product/' + id, {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(() => {
            setDeleteProduct(undefined)
            getAllProducts()
            setIsOpen(false)
            setIsLoading(false)
        })

    }

    function handleDelete(product: PRODUCT) {
        setDeleteProduct(product)
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }

    // console.log(products);
    return (

        <section className="flex relative flex-col w-full p-2 my-2">
            <div className="flex w-full flex-col items-center justify-between">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    محصولات ثبت شده
                </h2>

                {/* <HModal
                    open={isOpen}
                    close={closeModal}
                    title={`حذف محصول ${deleteProduct?.title}`}
                    body={`آیا از حذف محصول ${deleteProduct?.title} مطمئن هستید ؟`}
                >
                    <div
                        className=" flex w-full justify-around items-center">
                        <TERipple rippleColor="white">

                            <button
                                onClick={closeModal}
                                className=" bg-slate-300 text-center justify-center items-center text-slate-600 py-1 px-4 rounded shadow-sm">خیر</button>
                        </TERipple>

                        <button
                            onClick={() => deleteP(deleteProduct?._id)}
                            className="  text-slate-100 py-1 px-4 rounded shadow-sm bg-red-600 text-center justify-center items-center">
                            {!isLoading ? <span>بله حذف شود</span> : <span>Deleting...</span>}
                        </button>

                    </div>
                </HModal> */}

                <div className="flex flex-col items-center gap-3 w-full mt-4 gap-x-3">

                    <ButtonWithRipple
                        name="options"

                    >
                        عملیات
                    </ButtonWithRipple>

                    <LinkWithRipple
                        name="addProduct"
                        href={`product/addProduct/add?sidebarControl=false&sidebarVisible=false&theme=light`}
                    // href={`product/addProduct/add?sidebarControl=false&sidebarVisible=false&theme=light&${query}`}
                    >
                        <span>اضافه کردن محصول جدید</span>
                        <HiMiniPlus />
                        <Tooltip anchorSelect="#addProduct" clickable>
                            <button>اضافه کردن محصول جدید</button>
                        </Tooltip>
                    </LinkWithRipple>

                </div>
            </div>

            <div className="flex flex-col no-scrollbar mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto no-scrollbar sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden no-scrollbar border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                <span>نام</span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            قیمت
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            موجودی
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            توضیحات
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            دسته بندی
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            ثبت کننده
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            خواص محصول
                                        </th>

                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span
                                            // className="sr-only"
                                            >عملیات</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {products?.length > 0 && products.map((product, index) => (

                                        <tr key={index}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-300 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />

                                                    <div className="flex items-center gap-x-2">
                                                        <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 overflow-hidden no-scrollbar rounded-full dark:bg-gray-800">
                                                            <Image
                                                                src={`/uploads/images/${product.category?.images}`}
                                                                alt={product.category?.eName!}
                                                                width={50}
                                                                height={30}
                                                                quality={5}
                                                            />
                                                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                            </svg> */}
                                                        </div>

                                                        <div>
                                                            <h2 className="font-normal text-gray-800 dark:text-white ">{product.title}</h2>
                                                            <p className="text-xs font-normal text-gray-500 dark:text-gray-300">200 KB</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-normal text-gray-300 whitespace-nowrap">
                                                {product.price}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{product.stock}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{product.description}</td>
                                            <td className="px-12 py-4 text-sm font-normal text-gray-300 whitespace-nowrap">
                                                {product?.category?.name}
                                            </td>
                                            <td className="px-12 py-4 text-sm font-normal text-gray-300 whitespace-nowrap">
                                                {product?.author?.name}
                                            </td>
                                            <td className="px-12 py-4 text-sm font-normal text-gray-300 whitespace-nowrap">
                                                {
                                                    // product.propertys?.length && product.propertys.map((p, index) => (
                                                    //     <div
                                                    //         className=" flex flex-col mb-2"
                                                    //         key={index}>
                                                    //         <div className=" flex justify-between">
                                                    //             <span
                                                    //                 className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 dark:bg-primary-700 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700 dark:text-primary-200">
                                                    //                 {p[0]?.title}
                                                    //             </span>
                                                    //             <span
                                                    //                 className="inline-block whitespace-nowrap rounded-[0.27rem] bg-secondary-100 dark:bg-secondary-700 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800 dark:text-secondary-200">
                                                    //                 {p[0]?.value}
                                                    //             </span>
                                                    //         </div>
                                                    //     </div>
                                                    // ))
                                                }
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {!!product?.images?.length && product.images.map((image) => {
                                                    // const src = {`/public/uploads/${image}`}
                                                    // console.log(`http://localhost:3000/public/uploads/${image}`)
                                                    return (
                                                        <div className="relative aspect-video col-span-4" key={image}>
                                                            <Image
                                                                src={`/uploads/images/${image}`}
                                                                alt={image}
                                                                width={50}
                                                                height={30}
                                                                priority={true}

                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className=" flex justify-around items-center">

                                                    <Link
                                                        id={`edit-${product._id}`}
                                                        href={`/dashboard/product/edit/${product?._id}`}
                                                        className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                        <HiOutlinePencilSquare color="orange" />
                                                        <Tooltip anchorSelect={`#edit-${product?._id}`} >
                                                            ویرایش
                                                        </Tooltip>
                                                    </Link>

                                                    <Link
                                                        id={`gallery-${product._id}`}
                                                        href={`/dashboard/product/gallery/${product?._id}`}
                                                        className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                        <HiOutlinePhoto color="blue" />
                                                        <Tooltip
                                                            anchorSelect={`#gallery-${product?._id}`}
                                                        >
                                                            گالری
                                                        </Tooltip>
                                                    </Link>

                                                    {/* <TERipple */}
                                                    {/* rippleColor="white"> */}
                                                    <button
                                                        type="button"
                                                        id={`delete-${product._id}`}
                                                        onClick={() => handleDelete(product)}
                                                    >
                                                        <HiOutlineTrash color="red" />
                                                        <Tooltip anchorSelect={`#delete-${product._id}`} >
                                                            حذف
                                                        </Tooltip>
                                                    </button>
                                                    {/* </TERipple> */}


                                                    {/* <TEMModal
                                                        id={product._id}
                                                        close={isOpen}
                                                        headerTitle="اخطار"
                                                        bodyTitle={`آیا از حذف محصول ${product.title} مطمئن هستید ؟`}
                                                    >
                                                        <TERipple rippleColor="white">
                                                            <button
                                                                onClick={() => deleteP(product?._id)}
                                                                className="  text-slate-100 py-1 px-4 rounded shadow-sm bg-red-600 text-center justify-center items-center">
                                                                {!isLoading ? <span>بله</span> : <span>Deleting...</span>}
                                                            </button>
                                                        </TERipple>
                                                    </TEMModal> */}

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
    )
}
Product.auth = true