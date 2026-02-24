import { connectToDb } from "@/lib/db";
import { User } from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {

        const {email, password } = await req.json()
        if(!email || !password){
            return NextResponse.json(
                {error:"email and password requirede"},
                {status:400},
            )
        }

        await connectToDb()

        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json({message:"user already existed"},
                {status:401}
            )
        }

        const user = await User.create({
            email,
            password
        })


        if(!user){
            return NextResponse.json({error:"error while creating user"},
                {status:500}
        )}

        return NextResponse.json({message:"user created succesfully"},
            {status:201}
        )
        

        
    } catch (error) {
        return NextResponse.json(
            {error:"internal server error"},
            {status:500},
        )
    }
}
