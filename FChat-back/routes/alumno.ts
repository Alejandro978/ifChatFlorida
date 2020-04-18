import { Router, Request, Response } from "express";
import { Alumno } from "../models/alumno.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { verificaToken } from "../middlewares/autenticacion";



const alumnoRoutes = Router();

//Crear alumno
alumnoRoutes.post('/create', (req: Request, res: Response) => {
console.log(req.body);

    const alumno = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        idRol: req.body.idRol
    }

    Alumno.create(alumno).then(alumnoDb => {
        const tokenAlumno = Token.getJwtToken({
            email: alumnoDb.email,
            password: alumnoDb.password,
            nombre: alumnoDb.nombre,
            avatar: alumnoDb.avatar,
            idRol: alumnoDb.idRol,
            clases: alumnoDb.clases
            // clases:[]
        });


        //Si se consigue crear el usuario , la respuesta userDB será devuelta:
        res.json({
            ok: true,
            user: tokenAlumno
        })

    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })
});

//Añadir clases al alumno:

alumnoRoutes.put('/update', verificaToken, (req: any, res: Response) => {
    //Si verificaToken es correcto req.usuario obtendrá los datos del usuario logeado
    // res.json({
    //     ok: true,
    //     alumno: req.usuario
    // });

    Alumno.updateOne(
        { email: req.body.email, clases: { $ne: req.body.codigo }},
        { $push: { clases: [req.body.codigo] } },
        function (err, result) {
            if (err) {
                res.json({
                    ok: false,
                    mensaje: err
                })
            } else {
                res.json({
                    ok: true,
                    mensaje: 'Clase creada con exito'
                })
            }
        }
    );

});


export default alumnoRoutes;