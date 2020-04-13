import { Router, Request, Response } from "express";
import { Profesor } from "../models/profesor.model";
import bcrypt from 'bcrypt';


const profesorRoutes = Router();

profesorRoutes.post('/create', (req: Request, res: Response) => {

    const profesor = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        idRol: req.body.idRol
    }

    Profesor.create(profesor).then(profesorDb => {
        //Si se consigue crear el usuario , la respuesta userDB será devuelta:
        res.json({
            ok: true,
            user: profesorDb
        })

    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })


});


export default profesorRoutes;