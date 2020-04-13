import { Router, Request, Response } from "express";
import { Clase } from "../models/clase.model";



const claseRoutes = Router();

claseRoutes.post('/create', (req: Request, res: Response) => {

    const clase = {
        email: req.body.email,
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        avatar: req.body.avatar,

    }

    Clase.create(clase).then(claseDb => {
        //Si se consigue crear el usuario , la respuesta userDB será devuelta:
        res.json({
            ok: true,
            user: claseDb
        })

    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })


});


export default claseRoutes;