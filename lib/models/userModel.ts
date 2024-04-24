import { Model, Schema, model, models } from "mongoose"
import bcrypt from 'bcrypt'
import { Methods, UserDocument } from "@/type"

const UserSchema = new Schema<UserDocument, {}, Methods>({
    email: {
        type: "string",
        unique: true,
        trim: true,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email address']
    },
    name: {
        type: "string",
        required: true,
        unique: true,
        trim: true,
        minLength: [4, 'name  >=  4'],
        maxLength: [30, 'name < 30']
    },
    displayName: {
        type: "string",
        minLength: [4, 'name  >=  4'],
        maxLength: [30, 'name < 30']
    },
    password: {
        type: "string",
        require: [true, 'password is required'],
        minLength: [6, 'password  >=  6'],
        maxLength: [62, 'password < 62'],
        select: false
    },
    role: {
        type: 'string',
        default: "کاربر"
    },
    description: {
        type: 'string'
    },
    address: {
        type: 'string'
    },
    mobile: {
        type: 'string',
        require: true,
        minLength: [11, 'password  >=  11'],
        maxLength: [11, 'password < 11'],
    },
    verifyMKey: {
        type: 'string'
    },
    verifyMobileKey: {
        type: 'boolean'
    },
    verifyEKey: {
        type: 'string'
    },
    verifyEmailKey: {
        type: 'boolean'
    },
    basketId: {
        type: 'string'
    }


})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        throw error
    }
})

UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const Users = models.user || model("user", UserSchema)

export default Users as Model<UserDocument, {}, Methods>