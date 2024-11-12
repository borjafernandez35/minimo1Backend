import express from 'express';
import {comentarioController} from '../controller/comentario';



const router = express.Router()
const comentario_controller: comentarioController = new comentarioController();

router.get('/:page/:limit', async(_req, res) => {
     await comentario_controller.getAll(_req, res);
})

/* router.get('/:id', async(req, res) => {
    const data = await experienciasServices.getEntries.findById(req.params.id)
    return res.json(data);
}) */

/* router.get('/user/:id', async(req, res) => {
    const data = await experienciasServices.getEntries.findUserById(req.params.id)
    return res.json(data);
}) */

router.post('/:id', async(req, res) => {
    comentario_controller.createComentario(req, res);
})



router.put('/:id', async(req, res) => {
    comentario_controller.updateComentario(req, res);
})

router.delete('/:id', async(req, res) => {
    comentario_controller.deleteComentario(req, res);
})



export default router