"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clase_model_1 = require("../models/clase.model");
const claseRoutes = express_1.Router();
claseRoutes.post('/create', (req, res) => {
    const clase = {
        email: req.body.email,
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        avatar: req.body.avatar,
    };
    clase_model_1.Clase.create(clase).then(claseDb => {
        //Si se consigue crear el usuario , la respuesta userDB será devuelta:
        res.json({
            ok: true,
            user: claseDb
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = claseRoutes;
