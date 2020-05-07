"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notas_model_1 = require("../models/notas.model");
const notasRoutes = express_1.Router();
notasRoutes.post('/create', (req, res) => {
    const notas = {
        email: req.body.email,
        descripcion: req.body.descripcion,
        titulo: req.body.titulo,
        fecha: req.body.fecha
    };
    notas_model_1.Notas.create(notas).then(notaDb => {
        console.log(notaDb);
        res.json({
            ok: true,
            res: notaDb
        });
    }).catch(err => {
        res.json({
            ok: false,
            res: "No se pudo crear la nota"
        });
    });
});
//Método para obtener salas que coincidan con email profesor y alumno
//para comprobar si están repetidos...
notasRoutes.get('/getNotasByEmail', (req, res) => {
    let email = req.headers.email;
    notas_model_1.Notas.find({ email: email }, (err, notas) => {
        if (!notas) {
            return res.json({
                ok: false,
                mensaje: 'No existen clases para este profesor.'
            });
        }
        else {
            res.json({
                ok: true,
                data: notas
            });
        }
    });
});
notasRoutes.delete('/delete', (req, res) => {
    let _id = req.headers._id;
    notas_model_1.Notas.deleteOne({ _id: _id }, function (err) {
        if (err) {
            res.json({
                ok: false,
                mensaje: 'Ha habido un problema al eliminar la Nota'
            });
            throw (err);
        }
        else {
            res.json({
                ok: true,
                mensaje: 'Nota eliminada con exito'
            });
        }
    });
});
exports.default = notasRoutes;
