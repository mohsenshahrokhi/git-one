'use client'

import LinkWithRipple from '@/components/ui/components/Button/LinkWithRipple'
import React from 'react'
import { HiMiniPlus } from 'react-icons/hi2'
import { Tooltip } from 'react-tooltip'

type Props = {}

function Invoice({ }: Props) {
    return (
        <div className="flex flex-col w-full h-screen">
            <section className="flex relative overflow-y-auto flex-col w-full h-screen overflow-hidden p-1 my-2">
                <div className="sm:flex w-full justify-center items-center text-center flex-col sm:items-center sm:justify-between">
                    <h2 className="text-lg w-full justify-center items-center text-center mt-2 font-medium text-gray-800 dark:text-white">
                        دسته بندی های ثبت شده
                    </h2>

                    <div className="flex w-full justify-center items-center text-center mt-4 gap-x-3">

                        <LinkWithRipple
                            name="addProduct"
                            href={'/dashboard/invoice/addInvoice'}
                        >
                            <span>اضافه کردن دسته بندی جدید</span>
                            <HiMiniPlus />
                            <Tooltip anchorSelect="#addProduct" clickable>
                                <button>اضافه کردن دسته بندی جدید</button>
                            </Tooltip>
                        </LinkWithRipple>
                    </div>
                </div>

                <div className="flex flex-col overflow-auto mt-6">
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                    <span>نام</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span
                                                // className="sr-only"
                                                >نام لاتین</span>
                                            </th>

                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span
                                                // className="sr-only"
                                                >دسته والد</span>
                                            </th>

                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span
                                                // className="sr-only"
                                                >وضعیت</span>
                                            </th>

                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span
                                                // className="sr-only"
                                                >عملیات</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {categorys?.length > 0 && categorys.map((category, index) => (

                                        <tr key={index}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />

                                                    <div className="flex items-center gap-x-2">
                                                        <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                            </svg>
                                                        </div>

                                                        <div>
                                                            <h2 className="font-normal text-gray-800 dark:text-white ">{category.name}</h2>
                                                            <p className="text-xs font-normal text-gray-500 dark:text-gray-400">200 KB</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                {
                                                    category?.eName ? category.eName : '_'
                                                }
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                {
                                                    category?.parent ?
                                                        category.parent?.name : 'دسته اصلی'
                                                }
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                {
                                                    category?.type ? category.type : '_'
                                                }
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className=" flex justify-around items-center">

                                                    <Link
                                                        id={`edit-${category._id}`}
                                                        href={`/dashboard/category/edit/${category._id}`}
                                                        className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                        <HiOutlinePencilSquare color="orange" />
                                                        <Tooltip anchorSelect={`#edit-${category._id}`} >
                                                            ویرایش
                                                        </Tooltip>
                                                    </Link>

                                                 
                                                        <button
                                                            type="button"
                                                            id={`delete-${category._id}`}
                                                            onClick={() => deleteCategory(category._id)}
                                                        >
                                                            <HiOutlineTrash color="red" />
                                                            <Tooltip anchorSelect={`#delete-${category._id}`} >
                                                                حذف
                                                            </Tooltip>
                                                        </button>
                                                

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> */}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default Invoice