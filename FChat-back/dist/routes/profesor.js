"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profesor_model_1 = require("../models/profesor.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const profesorRoutes = express_1.Router();
profesorRoutes.post('/create', (req, res) => {
    const profesor = {
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        idRol: req.body.idRol
    };
    profesor_model_1.Profesor.create(profesor).then(profesorDb => {
        console.log(profesor);
        //Si se consigue crear el usuario , la respuesta userDB será devuelta:
        const tokenProfesor = token_1.default.getJwtToken({
            email: profesorDb.email,
            nombre: profesorDb.nombre,
            avatar: profesorDb.avatar
        });
        res.json({
            ok: true,
            token: tokenProfesor
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = profesorRoutes;
