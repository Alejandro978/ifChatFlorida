"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumno_model_1 = require("../models/alumno.model");
const profesor_model_1 = require("../models/profesor.model");
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
                        res.json({
                            ok: true,
                            token: 'asdasdadsadsdad'
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
                res.json({
                    ok: true,
                    token: 'asdasdadsadsdad'
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
