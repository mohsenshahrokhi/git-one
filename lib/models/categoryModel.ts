import { TCategorySchema } from "@/ZSchemas"
import { Schema, model, models } from "mongoose"

const CategorySchema = new Schema<TCategorySchema>({

    name: {
        type: String,
        required: [true, 'لطفا نام دسته بندی را وارد کنید'],
    },
    colorIcon: {
        type: String,
    },
    images: {
        type: [String],
    },
    icon: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: '0',
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        default: null
    },
    propertys: {
        type: Schema.Types.ObjectId,
        ref: 'categoryops',
        default: null
    },
    // propertys: [{
    //     type: Object,
    //     default: null
    // }]

})

const Category = models.categories || model("categories", CategorySchema)

export default Category 