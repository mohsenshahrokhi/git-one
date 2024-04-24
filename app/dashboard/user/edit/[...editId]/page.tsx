'use client'

import UserForm from '@/components/adminComponent/users/UserForm'
import { useParams } from 'next/navigation'

function EditProduct() {

    const { editId } = useParams()

    return (
        <div className='flex relative flex-col w-full border rounded-md shadow-md p-10 my-2'>
            <UserForm userId={editId} />
        </div>
    )
}

export default EditProduct