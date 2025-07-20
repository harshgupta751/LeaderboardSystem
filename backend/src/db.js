import mongoose from "mongoose";
const Schema= mongoose.Schema
import dotenv from 'dotenv'
dotenv.config()
export const ObjectId= mongoose.Types.ObjectId

mongoose.connect(process.env.MONGODB_URL)

const UserSchema= new Schema({
username: {type:String, required: true, unique: true},
totalPoints: {type: Number, required: true}
})

const ClaimHistorySchema= new Schema({
points: {type:Number, required: true},
userId: {type: ObjectId, required: true, ref: 'Users'}
},
{
    timestamps: true
})


export const UserModel= mongoose.model('Users',UserSchema)
export const ClaimHistoryModel= mongoose.model('ClaimHistory', ClaimHistorySchema)