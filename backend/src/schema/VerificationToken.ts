import mongoose,{Document ,Schema}from 'mongoose';
import { IUserDocument } from './User';
import crypto from "crypto-js"


interface IVerificationToken extends Document{
    userId: IUserDocument['_id'],
    token: string,
}
const VerifictionTokenSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    token: {type: String, required: true},
})


const VerifictionToken = mongoose.model<IVerificationToken>( 'VerifictionToken',VerifictionTokenSchema)
const createVarifictionToken = () : string =>{
    const timestamp =  Date.now().toString()
    const randomDate = Math.random().toString()
    const token = crypto.SHA256(timestamp + randomDate).toString()
    return token
}
export { VerifictionToken,createVarifictionToken}