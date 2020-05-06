import { Router, Request, Response } from "express";
import { Alumno } from "../models/alumno.model";
import { Clase } from "../models/clase.model";

import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { verificaToken } from "../middlewares/autenticacion";



const alumnoRoutes = Router();

//Crear alumno
alumnoRoutes.post('/create', (req: Request, res: Response) => {

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

alumnoRoutes.put('/update', (req: any, res: Response) => {

    //Se comprueba si el usuario ya tiene el código clase registrado:
    Alumno.find({ email: req.body.email, clases: req.body.codigo }, function (err, result) {
        //Si es 0 no la tiene registrada por lo que la registrará

        if (result.length === 0) {

            Alumno.updateOne(
                { email: req.body.email, clases: { $ne: req.body.codigo } },
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
                            mensaje: 'Clase registrada con exito'
                        })
                    }
                }
            );
        }
        //Si ya está creada la clase
        else {
            res.json({
                ok: false,
                mensaje: 'Ya esta registrado a esta Clase...'
            })
        }
    });
});



alumnoRoutes.get('/getCodigosClaseAlumno', (req: Request, res: Response) => {

    let email: any = req.headers.email;

    Alumno.findOne({ email: email }, (err, alumnoDb) => {
        if (err) throw err;
        if (!alumnoDb) {
            return res.json({
                ok: false,
                mensaje: 'No existen usuarios con este email.'
            })
        }
        else {
            let clases = alumnoDb.clases;
            res.json({
                ok: true,
                data: clases
            });
        }


    });
})

//Se obtiene listado de alumnos que pertenezcan a una clase:
alumnoRoutes.get('/getAlumnosByCodigo', (req: Request, res: Response) => {

    let codigo: any = req.headers.codigo;

    Alumno.find({ clases: { $in: ["123"] } }, (err, data) => {

        let listadoAlumnos: any[] = [];
        //Se mapean los alumnos
        data.forEach(dataAlumno => {
            const alumno = {
                email: dataAlumno.email,
                nombre: dataAlumno.nombre,
                avatar: dataAlumno.avatar,
            };

            listadoAlumnos.push(alumno);

        });

        return res.json({
            ok: true,
            alumnos: listadoAlumnos
        })

    })
});

//Se ejecuta cuando un alumno elimina una de las clases a la que esta registrada...
alumnoRoutes.put('/eliminarCodigoClase', (req: Request, res: Response) => {

    let email: any = req.body.email;
    let codigo: any[] = [];
    codigo.push(req.body.codigo);
    console.log(email);
    console.log(codigo);

    Alumno.updateOne({ email: email }, { $pullAll: { clases: codigo } }, (err, data) => {
        if (err) throw err;

        if (data.nModified > 0) {
            res.json({
                ok: true,
                data: 'Clase eliminada con exito.'
            });
        }
        else {
            res.json({
                ok: false,
                data: 'Parece que no existe ninugna Clase con este Código.'
            });
        }

    });

});

//Se ejecuta cuando un profesor elimina una clase, se le elimina a los demás usuarios...
alumnoRoutes.put('/eliminarCodigosClase', (req: Request, res: Response) => {

    let codigo: any[] = [];
    codigo.push(req.body.codigo);

    Alumno.updateMany({ idRol: 2 }, { $pullAll: { clases: codigo } }, (err, data) => {
        if (err) throw err;

        if (data.nModified > 0) {
            res.json({
                ok: true,
                data: 'Se han eliminado todos los registros de la clase....'
            });
        }
        else {
            res.json({
                ok: false,
                data: 'Parece que no existe este codigo de clase para este Usuario...'
            });
        }

    });

});

export default alumnoRoutes;