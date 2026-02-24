import mongoose, { Connection } from "mongoose"

const MONGO_URI = process.env.MONGO_URI!

if(!MONGO_URI){
    console.log("Please Provide Database Url");
}
let cachedDb = global.mongoose;

if(!cachedDb){
     cachedDb = global.mongoose = {conn:null , promise :null}
}


export async function connectToDb(){
    if(cachedDb.conn){
        return cachedDb.conn
    } 

    if(!cachedDb.promise){

        const opt = {
            bufferComands:true,
            maxPoolSize:10,
        };

        return mongoose.connect(
            MONGO_URI,
            opt
        ).then(()=>{
            mongoose.connection
        })
        

        try {
            cachedDb.conn = await cachedDb.promise
        } catch (error) {
            cachedDb.promise = null
            throw error
        }

        return cachedDb.conn


    }

    return cachedDb.conn

}

