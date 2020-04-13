import { Router, Request, Response } from "express";
import { Alumno } from "../models/alumno.model";
import bcrypt from 'bcrypt';



const alumnoRoutes = Router();

alumnoRoutes.post('/create', (req: Request, res: Response) => {

    const alumno = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        idRol: req.body.idRol
    }

    Alumno.create(alumno).then(alumnoDb => {
        //Si se consigue crear el usuario , la respuesta userDB será devuelta:
        res.json({
            ok: true,
            user: alumnoDb
        })

    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })


});


export default alumnoRoutes;