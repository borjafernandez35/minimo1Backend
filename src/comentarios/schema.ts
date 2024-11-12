import mongoose, { Schema } from "mongoose";
import { IComentario } from './model'

export const schema = new Schema<IComentario>({
    user: {type: Schema.Types.ObjectId, ref:'user'},
    likes: {type: Number, required: false},
    description: {type: String, required: false},
    
})

export default mongoose.model('comentario',schema)