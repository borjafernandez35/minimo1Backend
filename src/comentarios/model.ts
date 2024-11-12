import mongoose, { ObjectId } from "mongoose";

export interface IComentario{
     //_id?: mongoose.Types.ObjectId;
    user: ObjectId,
    likes: number,
    description?: String,

   
}