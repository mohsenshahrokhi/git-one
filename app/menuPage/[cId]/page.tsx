// import { PRODUCT } from '@/type'
import axios from 'axios'
import React from 'react'

type Props = {
    params: {
        cId: string
    }
}

async function getData(cId: string) {
    const p = await axios.get(`${process.env.BASE_URL}/api/product/${cId}`)
    return { products: p.data.products }
}

async function productPage({ params: { cId } }: Props) {
    const { products } = await getData(cId)
    console.log(products);

    return (
        <div>productPage{cId}</div>
    )
}

export default productPage