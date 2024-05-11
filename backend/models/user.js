import { mongoose } from "mongoose"

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        },
        username: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('User', userSchema)