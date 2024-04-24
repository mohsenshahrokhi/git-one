import React from 'react'

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

function EditSettings({ searchParams }: Props) {
    const time = searchParams.time
    const salary = searchParams.salary

    console.log(time, salary);

    return (
        <div>EditSettings</div>
    )
}

export default EditSettings