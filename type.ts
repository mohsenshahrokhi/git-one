import { NextResponse } from "next/server"
import { Document, Schema } from "mongoose"

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            name: string
            email: string
            role: string
            address: string
            description: string
            mobile: string
            verifyMobileKey: boolean
            verifyEmailKey: boolean
            verifyKey: string
            wishList: [string]
            accessToken: string
        }
    }
}

export interface UserDocument extends Document {
    email: string
    name: string
    displayName: string
    password: string
    address: string
    mobile: string
    verifyMobileKey: boolean
    verifyEmailKey: boolean
    description: string
    verifyMKey: string
    verifyEKey: string
    role: string
    payment: string
    image: string
    basketId: string

}
export interface InvoiceDocument extends Document {
    title: string,
    slug: string,
    measure: string,
    description: string,
    recipe: string,
    freight: string,
    price: string,
    images: string,
    propertys: [],
    category: CAT,
    seller: User,
    author: User,
    stock: string,
    purchaseDate: Date,
    createdAt: Date

}

export interface BasketsDocument extends Document {
    userId: UserDocument
    basket: object[]
    sell: string[]
    wishList: string[]
}


export interface Methods {
    comparePassword(password: string): Promise<boolean>
}


export interface User {
    _id?: string
    name: string
    email: string
    address?: string
    description?: string
    mobile: string
    verifyKey?: string
    wishList?: string
    password?: string
    role: string
    accessToken?: string
}

export interface Property {

}

export interface EditProduct {
    category: CAT
    description?: string
    images?: string[]
    price: number
    discount?: string
    propertys: { title: string, value: string | number }[]
    ratings?: string
    recipe?: string
    reviews?: []
    seller?: string
    author?: string
    slug: string
    title: string
    stock: string
    _id: string
}

export interface PRODUCT {
    category: CAT
    description?: string
    images?: string[]
    price: number
    discount?: number
    propertys?: any[]
    ratings?: string
    recipe?: string
    reviews?: []
    seller?: User
    author?: User
    slug: string
    title: string
    stock: number
    _id?: string
}


export interface Use {
    userId?: string
}

export interface AddCat {
    _id?: string
    name?: string
    slug?: string
    parent?: string
    propertys?: [{ name: string, values: string }]
    eName?: string
    colorIcon?: string
    icon?: string
    images?: [string]
    type?: string
}

export interface CAT {
    _id?: string
    name?: string
    slug?: string
    parent?: CAT
    propertys?: [{ name: string, values: any }]
    eName?: string
    colorIcon?: string
    icon?: string
    images?: [string]
    type?: string
}
export interface CatDocument extends Document {

    name: string
    slug: string
    parent?: Schema.Types.ObjectId
    propertys?: [{ name: string, values: any }]
    eName?: string
    colorIcon?: string
    icon?: string
    images?: string[]
    type?: string
}

export interface GalleryInfoProps {
    _id: string
    title: string
    url: string
}

export interface ID {
    id: string | undefined
}

export interface Property {
    name: string
    values: String
}

export interface NewUserRequest {
    form: {
        name: string
        email: string
        password: string
    }
}

export interface NewUserResponse {
    id: string
    name: string
    email: string
    role: string
}

export type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>

export interface CreateUser {
    email: string
    name: string
    password: string
}

export interface UserLogin {
    email: string
    password: string
}