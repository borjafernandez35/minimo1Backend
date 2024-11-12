//import { IProperty } from './model';
import { Types } from 'mongoose';
import { IComentario } from './model';
import comentario from './schema';
import user from '../user/schema';

export const getEntries = {
    getAll: async()=>{
    return await comentario.find();
    },
    findById: async(id:string)=>{
        return await comentario.findById(id);
    },
    filterComentario: async(query: any): Promise<IComentario | null>=> {
        try {
            return await comentario.findOne(query);
        } catch (error) {
            throw error;
        }
    },

    addComentarioToUser: async(userId: Types.ObjectId, comentarioId: Types.ObjectId): Promise<void>=> {
        try {
            // Retrieve the user document by ID
            const users = await user.findById(userId);
            if (!users) {
                throw new Error('User not found');
            }

            // Add the post ID to the user's array of posts
            users.comment.push(comentarioId);

            // Save the updated user document
            await users.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    findUserById: async(id:string)=>{
        return await comentario.findById(id).populate('user');
    },
    addUserComment: async(idExp:string,idPart:string)=>{
        return await comentario.findByIdAndUpdate(idExp,{$addToSet:{user:idPart}});
    },
    delUserComment: async(idExp:string,idPart:string)=>{
        return await comentario.findByIdAndUpdate(idExp,{$pull:{user:idPart}});
    },
    create: async(entry:object)=>{
        return await comentario.create(entry);
    },
    update: async(id:string,body:object)=>{
        console.log(body);
        return await comentario.findByIdAndUpdate(id,body,{$new:true});
    },
    updateComentario: async(comentario_params: IComentario, comentario_filter: any): Promise<void>=> {
        try {
            await comentario.findOneAndUpdate(comentario_filter, {$set: comentario_params }, { new: true });
        } catch (error) {
            throw error;
        }
    },

    delete: async(id:string)=>{
        return await comentario.findByIdAndDelete(id);
    }
}