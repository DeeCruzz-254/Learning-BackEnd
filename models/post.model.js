import mongoose from "mongoose";
const {Schema} = mongoose;

const postSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,   
        required: true,
        trim: true
    },
    age : {
        type: Number,
        required: true,
        min: 0
    }

}, {timestamps: true});
export const Post = mongoose.model('Post', postSchema);

