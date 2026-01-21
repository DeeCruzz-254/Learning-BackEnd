import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {timestamps: true});

//before saving the user, hash the password if it has been modified
userSchema.pre('save', async function () {
    if(!this.isModified("password"))return;
    this.password = await bcrypt.hash(this.password, 10);
});

//compare passwords
userSchema.methods.comparePassword = async function (password) 
{
    return await bcrypt.compare(password, this.password);
};  


export const User = mongoose.model('User', userSchema);
//# sourceMappingURL=user.model.js.map