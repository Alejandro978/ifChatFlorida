"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumno_model_1 = require("../models/alumno.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const alumnoRoutes = express_1.Router();
//Crear alumno
alumnoRoutes.post('/create', (req, res) => {
    console.log(req.body);
    const alumno = {
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        idRol: req.body.idRol
    };
    alumno_model_1.Alumno.create(alumno).then(alumnoDb => {
        const tokenAlumno = token_1.default.getJwtToken({
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
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Añadir clases al alumno:
alumnoRoutes.put('/update', (req, res) => {
    //Si verificaToken es correcto req.usuario obtendrá los datos del usuario logeado
    // res.json({
    //     ok: true,
    //     alumno: req.usuario
    // });
    //Si
    //Se comprueba si el usuario ya tiene el código clase registrado:
    alumno_model_1.Alumno.find({ email: req.body.email, clases: req.body.codigo }, function (err, result) {
        //Si es 0 no la tiene registrada por lo que la registrará
        if (result.length === 0) {
            alumno_model_1.Alumno.updateOne({ email: req.body.email, clases: { $ne: req.body.codigo } }, { $push: { clases: [req.body.codigo] } }, function (err, result) {
                if (err) {
                    res.json({
                        ok: false,
                        mensaje: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        mensaje: 'Clase registrada con exito'
                    });
                }
            });
        }
        //Si ya está creada la clase
        else {
            res.json({
                ok: false,
                mensaje: 'Ya esta registrado a esta Clase...'
            });
        }
    });
});
exports.default = alumnoRoutes;
