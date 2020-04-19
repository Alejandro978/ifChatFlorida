"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumno_model_1 = require("../models/alumno.model");
const profesor_model_1 = require("../models/profesor.model");
const token_1 = __importDefault(require("../classes/token"));
const loginRoutes = express_1.Router();
loginRoutes.post('/login', (req, res) => {
    const body = req.body;
    //Primero se consulta si el email existe en la tabla de Profesores --> 
    profesor_model_1.Profesor.findOne({ email: body.email }, (err, profesorDb) => {
        if (err)
            throw err;
        //Si no lanza el throw con error se consulta si profesorDb existe:
        if (!profesorDb) {
            //En caso de no existir se consulta en la tabla de Alumnos:
            alumno_model_1.Alumno.findOne({ email: body.email }, (err, alumnoDb) => {
                if (err)
                    throw err;
                //Si no lanza el throw con error se consulta si profesorDb existe:
                if (!alumnoDb) {
                    return res.json({
                        ok: false,
                        mensaje: 'Usuario/Contraseña incorrectos'
                    });
                }
                //Si el alumno si existe
                else {
                    if (alumnoDb.compararPassword(body.password)) {
                        const tokenAlumno = token_1.default.getJwtToken({
                            email: alumnoDb.email,
                            nombre: alumnoDb.nombre,
                            avatar: alumnoDb.avatar
                        });
                        res.json({
                            ok: true,
                            token: tokenAlumno,
                            user: body,
                            idRol: '2'
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
                const tokenProfesor = token_1.default.getJwtToken({
                    email: profesorDb.email,
                    nombre: profesorDb.nombre,
                    avatar: profesorDb.avatar
                });
                res.json({
                    ok: true,
                    token: tokenProfesor,
                    user: body,
                    idRol: '1'
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
});
exports.default = loginRoutes;
