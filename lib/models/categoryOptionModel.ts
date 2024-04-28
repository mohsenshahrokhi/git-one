import { Methods, TCategoryOptionSchema } from "@/ZSchemas"
import { Model, Schema, model, models } from "mongoose"

const CategoryOptionSchema = new Schema<TCategoryOptionSchema>({
    _id: {
        type: "string",
        unique: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    propertys: [{
        type: Object,
        required: true
    }]
})

const CategoryOption = models.categoryops || model('categoryops', CategoryOptionSchema)

export default CategoryOption