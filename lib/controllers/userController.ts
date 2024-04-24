import Users from "@/lib/models/userModel"
import connectToMongodb from "../mongodb"
import { CreateUser, User } from '@/type'
import { NextResponse } from "next/server"
import { MongooseQueryParser } from "mongoose-query-parser"

export const getAllUsers = async (req: any) => {
    try {
        connectToMongodb()
        let users = []
        const url = new URL(req.url).search.split('?')[1]
        if (url) {
            const parser = new MongooseQueryParser()
            const parsed = parser.parse(url)
            users = await Users
                .find(parsed.filter)
                .sort(parsed.sort).
                limit(parsed.limit || 10)
                .populate(parsed.populate)
                .select(parsed.select)
        } else {
            users = await Users.find()
        }
        const updateUId: User[] = users.map(user => ({
            ...user._doc, _id: user._doc._id.toString()
        }))
        return updateUId
    } catch (error) {
        return error
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        connectToMongodb()
        const NewUser = await Users.findOne({ email }).select('+password')
        // console.log('userEmail', NewUser)
        const updateCId = {
            ...NewUser?._doc, _id: NewUser?._doc._id.toString()
        }
        return updateCId
        // return oldUser
    } catch (error) {
        return error
    }
}

export const getUserById = async (_id: string) => {
    try {
        connectToMongodb()
        const NewUser = await Users.findOne({ _id })
        const updateCId = {
            ...NewUser?._doc, _id: NewUser?._doc._id.toString()
        }
        return updateCId
        // return oldUser
    } catch (error) {
        return error
    }
}

export const registerUser = async (user: CreateUser) => {
    try {
        connectToMongodb()
        console.log(user);

        const NewUser = await Users.create({ ...user })
        const updateCId = {
            ...NewUser._doc, _id: NewUser._doc._id.toString()
        }
        return updateCId
    } catch (err) {
        return err
    } finally {
        // await prisma.$disconnect()
    }
}

export const updateUser = async (_id: string, params: any) => {

    try {

        connectToMongodb()
        const { data } = params

        const updatedUser = await Users.updateOne({ _id }, { ...data })

        // const updatePId = {
        //     ...updatedUser._doc, _id: updatedUser._doc._id.toString()
        // }

        // return updatePId
        return updatedUser

    } catch (err) {
        return err
    } finally {
        // await prisma.$disconnect()
    }

}

export const deleteUser = async (_id: any) => {

    try {

        connectToMongodb()

        await Users.deleteOne({ _id })


        return NextResponse.json({ message: 'ok' }, { status: 201 })


    } catch (error) {
        return NextResponse.json({ message: 'faild to create a new product', error }, { status: 500 })
    }

}
