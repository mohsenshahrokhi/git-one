
import { CatDocument, Methods } from "@/type"
import { Schema, model, models } from "mongoose"

const CategorySchema = new Schema<CatDocument, {}, Methods>({

    name: {
        type: String,
        required: [true, 'لطفا نام دسته بندی را وارد کنید'],
    },
    eName: {
        type: String,
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
        default: false,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        default: null
    },
    propertys: [{
        type: Object,
        default: null
    }]

})

const Category = models.category || model("category", CategorySchema)

export default Category