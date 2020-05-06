import { Router, Request, Response } from "express";
import { Profesor } from "../models/profesor.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { Notas } from "../models/notas.model";


const notasRoutes = Router();

notasRoutes.post('/create', (req: Request, res: Response) => {

    const notas = {
        email: req.body.email,
        descripcion: req.body.nombre,
        titulo: req.body.avatar,
        prioridad: req.body.idRol
    }

    Notas.create(notas).then(notasDb => {

        res.json({
            ok: true,
            token: notasDb
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })


});


export default profesorRoutes;