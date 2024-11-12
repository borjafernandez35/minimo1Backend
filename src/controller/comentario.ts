import { Request, Response } from 'express';
import { IComentario } from '../comentarios/model';
import * as comentariosServices from '../comentarios/service';
//import * as usersServices from '../user/service';

export class comentarioController {


    public async createComentario(req: Request, res: Response) {
        try{
            // this check whether all the filds were send through the request or not
            if (req.body.likes  && req.body.description && req.body.user){
                const comentario_params:IComentario = {
                    likes: req.body.likes,
                    //rating: 0,
                    description: req.body.description,
                    user: req.body.user,
                    //picture:req.body.picture
                    //active: true
                };
                const comentario_data = await comentariosServices.getEntries.create(comentario_params);
                await comentariosServices.getEntries.addComentarioToUser(req.body.user, comentario_data._id);
                return res.status(201).json({ message: 'Comment created successfully', comentario: comentario_data });
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

   

    public async getAll(req: Request, res: Response) {
        try {
            console.log("funciona get all");
            //const activity_filter = {};
            const comentario_data = await comentariosServices.getEntries.getAll();
            let total=comentario_data.length;
            const page = Number(req.params.page); // Convertir a número
            const limit = Number(req.params.limit); // Convertir a número
           
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            let totalPages= Math.ceil(total/limit);
    
            
            const resultComentario = comentario_data.slice(startIndex, endIndex);
            console.log(resultComentario, totalPages,total);
            return res.status(200).json({comentarios:resultComentario,totalPages:totalPages,totalActivity:total});
            
        } catch (error) {
            
            console.error('Error en la solicitud:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    public async deleteComentario(req: Request, res: Response) {
        const comentarioId = req.params.id;

    return comentariosServices.getEntries.delete(comentarioId)
        .then((comentario) => (comentario ? res.status(201).json({ comentario, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
    }

    public async updateComentario(req: Request, res: Response) {
        try {
            if (req.params.id) {
                const comentario_filter = { _id: req.params.id };
                // Fetch user
                const comment_data = await comentariosServices.getEntries.filterComentario(comentario_filter);
                if (!comment_data) {
                    // Send failure response if user not found
                    return res.status(400).json({ error: 'Activity not found'});
                }
    
                const comentario_params: IComentario = {
                    likes: req.body.likes,
                    //rating: req.body.rating,
                    description: req.body.description,
                    user: req.body.userr,
                    //picture: req.body.picture
                    //active: true
                };
                const comentario_data = await comentariosServices.getEntries.create(comentario_params);
                await comentariosServices.getEntries.addComentarioToUser(req.body.owner, comentario_data._id);
                await comentariosServices.getEntries.updateComentario(comentario_params, comentario_filter);
                //get new activity data
                const new_activity_data = await comentariosServices.getEntries.filterComentario(comentario_filter);
                // Send success response
                
                return res.status(200).json({ data: new_activity_data, message: 'Successful update'});
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing ID parameter' });
            }
        } catch (error) {
            // Catch and handle any errors
            console.error("Error updating:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    
} 