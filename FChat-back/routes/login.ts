import { Router, Request, Response } from "express";
import { Alumno } from "../models/alumno.model";
import { Profesor } from "../models/profesor.model";
import Token from "../classes/token";




const loginRoutes = Router();

loginRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;

    //Primero se consulta si el email existe en la tabla de Profesores --> 
    Profesor.findOne({ email: body.email }, (err, profesorDb) => {
        if (err) throw err;

        //Si no lanza el throw con error se consulta si profesorDb existe:
        if (!profesorDb) {

            //En caso de no existir se consulta en la tabla de Alumnos:

            Alumno.findOne({ email: body.email }, (err, alumnoDb) => {
                if (err) throw err;

                //Si no lanza el throw con error se consulta si profesorDb existe:
                if (!alumnoDb) {
                    return res.json({
                        ok: false,
                        mensaje: 'Usuario/Contraseña incorrectos'
                    })
                }
                //Si el alumno si existe
                else {
                    if (alumnoDb.compararPassword(body.password)) {

                        const tokenAlumno = Token.getJwtToken({
                            email: alumnoDb.email,
                            nombre: alumnoDb.nombre,
                            avatar: alumnoDb.avatar
                        });

                        res.json({
                            ok: true,
                            token: tokenAlumno
                        });
                    }
                    else {
                        return res.json({
                            ok: false,
                            mensaje: 'Usuario/Contraseña incorrectos'
                        });
                    }
                }
            });
        }
        //Si el profesor si existe
        else {
            if (profesorDb.compararPassword(body.password)) {

                const tokenProfesor = Token.getJwtToken({
                    email: profesorDb.email,
                    nombre: profesorDb.nombre,
                    avatar: profesorDb.avatar
                });

                res.json({
                    ok: true,
                    token: tokenProfesor
                });
            }
            else {
                return res.json({
                    ok: false,
                    mensaje: 'Usuario/Contraseña incorrectos'
                });
            }
        }

    })
})


export default loginRoutes;