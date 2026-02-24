import mongoose, {models,model,Schema, mongo} from "mongoose";

const VIDEO_DIMENTIONS = {
    width:1080,
    height:1920
} as const;


export interface IVideo {
    title:string,
    _id?:mongoose.Types.ObjectId,
    thumbnail:string,
    videoUrl:string,
    createdAt?:Date,
    updatedAt?:Date,
    description:string,
    controls:boolean,
    transformation?:{
        width:number,
        height:number,
        quality?:number
    }

}

const videoSchema = new Schema<IVideo>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    videoUrl:{type:String,required:true},
    thumbnail:{type:String,required:true},
    controls:{type:Boolean,required:true},
    transformation:{
        width:{type:Number,default:VIDEO_DIMENTIONS.width},
        height:{type:Number,default:VIDEO_DIMENTIONS.width},
        quality:{type:Number,min:1 , max:100}
    },

},{timestamps:true})

const Video = mongoose.models.Video || mongoose.model("Video",videoSchema)

export default Video