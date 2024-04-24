'use client'

import Gallery from '@/components/adminComponent/Gallery/Gallery copy'
import { useParams } from "next/navigation"
import { useState } from 'react'

function AddPhoto() {
    const { pId } = useParams()
    const [image, setImage] = useState<string>('')
    return <Gallery itemId={image} updateImage={setImage} />
}

export default AddPhoto