'use client'

import CategoryForm from '@/components/adminComponent/Categories/CategoryForm copy'
import { AddCat } from '@/type'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function EditCategory() {

    const router = useRouter()

    const { editId } = useParams()
    const [categoryInfo, setCategoryInfo] = useState<AddCat>()
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const accessToken = session?.user && session?.user?.accessToken || ''


    useEffect(() => {

        accessToken && axios.get(`/api/category/${editId}`, {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then((response) => {
            setCategoryInfo(response.data.category)
        })

    }, [editId, accessToken])

    if (!categoryInfo?._id) {

        return (
            <div>loading...</div>
        )
    }

    return (
        <div className='flex overflow-y-auto relative flex-col w-full border rounded-md shadow-md p-10 my-2'>
            <h3>
                {`ویرایش محصول ( ${categoryInfo?.name} )`}
            </h3>
            <CategoryForm categoryInfo={categoryInfo} />
        </div>
    )
}

export default EditCategory