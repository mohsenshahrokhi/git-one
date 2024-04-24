// import prisma from "@/prisma"

import { MongooseQueryParser } from "mongoose-query-parser"
import Category from "../models/categoryModel"
import connectToMongodb from "../mongodb"
import { CAT } from "@/type"


export const getAllCategory = async (req: any) => {
  try {
    connectToMongodb()

    let categories = []
    const url = new URL(req.url).search.split('?')[1]
    if (url) {
      const parser = new MongooseQueryParser()
      const parsed = parser.parse(url)
      categories = await Category
        .find(parsed.filter)
        .sort(parsed.sort)
        .limit(parsed.limit || 10)
        .populate(parsed.populate)
        .select(parsed.select)
    } else {
      categories = await Category.find()
    }
    const updateCId = categories.map(category => ({

      ...category._doc, _id: category._doc._id.toString()

    }))
    // console.log(updateCId);

    return updateCId
  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect();
  }
}

export const getCategory = async (_id: string) => {

  try {
    connectToMongodb()
    const category = await Category.findById({ _id })
    const updateCId = {
      ...category._doc, _id: category._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect();
  }
}


export const getCategoryBySlug = async (slug: string) => {

  try {
    connectToMongodb()
    const category = await Category.findOne({ slug })
    const updateCId = {
      ...category._doc, _id: category._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect();
  }
}

export const createCategory = async (params: CAT) => {
  try {
    connectToMongodb()
    console.log('params', params)
    const category = await Category.create({ ...params })
    const updateCId = {
      ...category._doc, _id: category._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect()
  }
}

export const updateCategory = async (_id: string, params: any) => {
  try {
    connectToMongodb()
    // console.log('_id', _id, params)
    const { data } = params
    const category = await Category.updateOne({ _id }, { ...data })

    const updateCId = {

      ...category._doc, _id: category._doc._id.toString()

    }

    return updateCId

  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect()
  }
}

export const deleteCategory = async (_id: string) => {

  try {
    connectToMongodb()

    await Category.deleteOne({ _id })

    return true

  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect()
  }
}
