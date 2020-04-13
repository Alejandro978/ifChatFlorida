"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumno_model_1 = require("../models/alumno.model");
const alumnoRoutes = express_1.Router();
alumnoRoutes.post('/create', (req, res) => {
    const alumno = {
        email: req.body.email,
        password: req.body.password,
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        idRol: req.body.idRol
    };
    alumno_model_1.Alumno.create(alumno).then(alumnoDb => {
        //Si se consigue crear el usuario , la respuesta userDB será devuelta:
        res.json({
            ok: true,
            user: alumnoDb
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = alumnoRoutes;
