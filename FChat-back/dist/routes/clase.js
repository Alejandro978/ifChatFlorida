"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clase_model_1 = require("../models/clase.model");
const claseRoutes = express_1.Router();
claseRoutes.post('/create', (req, res) => {
    console.log(req);
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
claseRoutes.get('/getClasesByEmail', (req, res) => {
    let email = req.headers.email;
    clase_model_1.Clase.find({ email: email }, (err, listadoClases) => {
        if (err)
            throw err;
        let listadoClasesDevolver = [];
        //Se mapean las clases
        listadoClases.forEach(clases => {
            const clase = {
                email: clases.email,
                nombre: clases.nombre,
                avatar: clases.avatar,
                codigo: clases.codigo
            };
            listadoClasesDevolver.push(clase);
        });
        if (!listadoClases) {
            return res.json({
                ok: false,
                mensaje: 'No existen clases para este profesor.'
            });
        }
        else {
            res.json({
                ok: true,
                data: listadoClasesDevolver
            });
        }
    });
});
claseRoutes.get('/getClasesByCodigo', (req, res) => {
    let codigo = req.headers.codigo;
    let clase;
    clase_model_1.Clase.findOne({ codigo: codigo }, (err, resClase) => {
        if (err)
            throw err;
        if (!!resClase) {
            clase = {
                email: resClase.email,
                nombre: resClase.nombre,
                avatar: resClase.avatar,
                codigo: resClase.codigo
            };
        }
        if (!clase) {
            return res.json({
                ok: false,
                mensaje: 'No existen clases con este código.'
            });
        }
        else {
            res.json({
                ok: true,
                data: clase
            });
        }
    });
});
claseRoutes.get('/getAll', (req, res) => {
    clase_model_1.Clase.find((err, resClase) => {
        if (err)
            throw err;
        console.log(res);
        if (!resClase) {
            return res.json({
                ok: false,
                mensaje: 'No existen clases con este código.'
            });
        }
        else {
            res.json({
                ok: true,
                data: resClase
            });
        }
    });
});
exports.default = claseRoutes;
