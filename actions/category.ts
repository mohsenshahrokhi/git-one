'use server'

import { CategoryOptionSchema, TCategoryOptionSchema } from "@/ZSchemas"
import { getCategoryOption } from "@/lib/controllers/categoryOptionController"

export const getCatOptions = async (_id: string) => {

    const validatedField = CategoryOptionSchema.safeParse(_id)

    const catOptions = await getCategoryOption(_id)

    return { success: true, catOptions }
}