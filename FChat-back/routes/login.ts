import { Router, Request, Response } from "express";
import { Alumno } from "../models/alumno.model";
import { Profesor } from "../models/profesor.model";
import Token from "../classes/token";
import { verificaToken } from "../middlewares/autenticacion";




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
                            avatar: alumnoDb.avatar,
                        });

                        res.json({
                            ok: true,
                            token: tokenAlumno,
                            user: body,
                            idRol: '2',
                            clases: alumnoDb.clases,
                            nombreAlumno: alumnoDb.nombre,
                            avatar: alumnoDb.avatar
                            
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
                console.log(profesorDb);

                const tokenProfesor = Token.getJwtToken({
                    email: profesorDb.email,
                    nombre: profesorDb.nombre,
                    avatar: profesorDb.avatar
                });

                res.json({
                    ok: true,
                    token: tokenProfesor,
                    user: body,
                    idRol: '1',
                    nombreProfesor: profesorDb.nombre,
                    avatar:profesorDb.avatar
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

loginRoutes.get('/', [verificaToken], (req: any, res: Response) => {

    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    })
})


export default loginRoutes;