"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profesor_model_1 = require("../models/profesor.model");
const profesorRoutes = express_1.Router();
profesorRoutes.post('/create', (req, res) => {
    const profesor = {
        email: req.body.email,
        password: req.body.password,
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        idRol: req.body.idRol
    };
    profesor_model_1.Profesor.create(profesor).then(profesorDb => {
        //Si se consigue crear el usuario , la respuesta userDB será devuelta:
        res.json({
            ok: true,
            user: profesorDb
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = profesorRoutes;
