"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notas_model_1 = require("../models/notas.model");
const notasRoutes = express_1.Router();
notasRoutes.post('/create', (req, res) => {
    const notas = {
        email: req.body.email,
        descripcion: req.body.nombre,
        titulo: req.body.avatar,
        prioridad: req.body.idRol
    };
    notas_model_1.Notas.create(notas).then(notasDb => {
        res.json({
            ok: true,
            token: notasDb
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = profesorRoutes;
