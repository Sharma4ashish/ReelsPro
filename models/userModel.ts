import bcrypt from "bcryptjs"
import mongoose, { Schema, models, model } from "mongoose"

interface Iuser{
    _id?:mongoose.Types.ObjectId,
    email:string,
    password:string,
    createdBy?:Date,
    updatedAT?:Date
}

const userSchema = new Schema<Iuser>({
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    }
},{timestamps:true});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next
})


export const User = models.User || model<Iuser>("User",userSchema)