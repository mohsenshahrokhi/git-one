'use client'

import CategoryForm from '@/components/adminComponent/Categories/CategoryForm copy'
import { verifyJwt } from '@/lib/jwt'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

function AddCategory({ }: Props) {

    // const router = useRouter()
    // const { data: session } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         router.push('/login')
    //     },
    // })

    // const accessToken = session?.user && session?.user?.accessToken || ''

    // const verify = accessToken && verifyJwt(accessToken!) || null
    // console.log('verify', verifyJwt(accessToken));
    // if (verify?.role !== "مدیر کل") {

    //     // router.push('/login')
    // }

    const categoryInfo = {}
    return (
        <div className="flex flex-col w-full">
            <h1>دسته بندی ها</h1>

            <CategoryForm categoryInfo={categoryInfo} />
        </div>
    )
}

export default AddCategory