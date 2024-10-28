import mongoose , {Document , Schema} from "mongoose";
import Joi from "joi"
import PasswordComplexity from 'joi-password-complexity';
import { IUser } from "../types/userType";
interface IUserDocument extends IUser, Document { }
import jwt from "jsonwebtoken";

const complexityOptions = {
    min: 8,             // Minimum length
    max: 30,            // Maximum length
    lowerCase: 1,       // At least 1 lowercase letter
    upperCase: 1,       // At least 1 uppercase letter
    symbol: 1,          // At least 1 special character
  };

const UserSchema: Schema = new Schema({ 
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true,unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isVerified: {type: Boolean, default: false}
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    }
)
UserSchema.virtual("tasks",{
    ref: "tasks",
    localField: "_id",
    foreignField: "user"
})
export const CreateToken = (id: string): string =>{
    const token = jwt.sign({_id: id}, process.env.JWT_SECRET as string)
    return token
}

const User = mongoose.model<IUserDocument>("Users", UserSchema)

const validateRegistUser = (obj:IUser) =>{
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required().trim(),
        lastName: Joi.string().min(2).max(50).required().trim(),
        userName: Joi.string().min(2).max(50).required().trim(),
        email: Joi.string().min(5).max(255).required().trim().email(),
        password: PasswordComplexity(complexityOptions).required(),
    })
    return schema.validate(obj)
}

const validateLoginUser = (obj: IUser) =>{
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().trim().email(),
        password: PasswordComplexity(complexityOptions).required().trim(),
    })
    return schema.validate(obj)
}

const validateEmail =(obj: IUser) =>{
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(255).required().email(),
    })
    return schema.validate(obj)
}

const validateNewPassword= (obj: IUser)=>{
    const schema = Joi.object({
        password: PasswordComplexity().required(),
    })
    return schema.validate(obj)
}

const validateUpdateUser = (obj: IUser)=>{
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50),
        lastName: Joi.string().min(2).max(50),
        email: Joi.string().min(5).max(255).trim().email(),
        userName: Joi.string().min(2).max(50),
        password: PasswordComplexity(),
    })
    return schema.validate(obj)
}

export {User,IUserDocument, validateRegistUser, validateLoginUser, validateEmail, validateNewPassword, validateUpdateUser}
