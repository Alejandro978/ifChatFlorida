"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumno_model_1 = require("../models/alumno.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const alumnoRoutes = express_1.Router();
//Crear alumno
alumnoRoutes.post('/create', (req, res) => {
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
alumnoRoutes.put('/update', autenticacion_1.verificaToken, (req, res) => {
    //Si verificaToken es correcto req.usuario obtendrá los datos del usuario logeado
    // res.json({
    //     ok: true,
    //     alumno: req.usuario
    // });
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
                mensaje: 'Clase creada con exito'
            });
        }
    });
    // const alumno = {
    //     email: req.body.email,
    //     nombre: req.body.nombre,
    //     avatar: req.body.avatar,
    //     clases: req.body.idClase
    // }
    // console.log(req.body);
    //     Alumno.findByIdAndUpdate(req.body.email, alumno, { new: true }, (err, alumnoDb) => {
    //         if (err) throw err;
    //         if (!alumnoDb) {
    //             return res.json({
    //                 ok: false,
    //                 mensaje: 'No existe un usuairo con este id'
    //             });
    //         }
    //         const tokenAlumno = Token.getJwtToken({
    //             email: alumnoDb.email,
    //             password: alumnoDb.password,
    //             nombre: alumnoDb.nombre,
    //             avatar: alumnoDb.avatar,
    //             idRol: alumnoDb.idRol,
    //             clases: alumnoDb.clases
    //             // clases:[]
    //         });
    //         return res.json({
    //             ok: true,
    //             mensaje: tokenAlumno
    //         });
    //     });
    // });
    //  alumnoRoutes.route("/update").put(function (req, res) {
    //         console.log("se va a ejectuar");
    //         Alumno.updateOne(
    //             { email: "alumno1@gmail.com" },
    //             { $push: { clases: ["New York"] } },
    //             function (err, result) {
    //                 if (err) {
    //                     res.json({
    //                         ok: false,
    //                         mensaje: err
    //                     })
    //                 } else {
    //                     res.json({
    //                         ok: true,
    //                         mensaje: 'Clase creada con exito'
    //                     })
    //                 }
    //             }
    //         );
});
exports.default = alumnoRoutes;
