"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatRoom_model_1 = require("../models/chatRoom.model");
const chatRoomRoutes = express_1.Router();
chatRoomRoutes.post('/create', (req, res) => {
    const chatRoom = {
        emailAlumno: req.body.emailAlumno,
        emailProfesor: req.body.emailProfesor,
        clase: req.body.clase,
        avatar: req.body.avatar,
    };
    chatRoom_model_1.ChatRoom.create(chatRoom).then(profesorDb => {
        //Si se consigue crear el usuario , la respuesta userDB será devuelta:
        res.json({
            ok: true,
            res: "Creado con exito"
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Obtiene las salas de chat de un usuario por su email
chatRoomRoutes.get('/getChatRoomByEmail', (req, res) => {
    let email = req.headers.email;
    if (req.headers.idrol === "1") {
        chatRoom_model_1.ChatRoom.find({ emailProfesor: email }, (err, chatRooms) => {
            if (!chatRooms) {
                return res.json({
                    ok: false,
                    mensaje: 'No existen clases para este profesor.'
                });
            }
            else {
                res.json({
                    ok: true,
                    data: chatRooms
                });
            }
        });
    }
    else {
        chatRoom_model_1.ChatRoom.find({ emailAlumno: email }, (err, chatRooms) => {
            if (!chatRooms) {
                return res.json({
                    ok: false,
                    mensaje: 'No existen clases para este alumno.'
                });
            }
            else {
                res.json({
                    ok: true,
                    data: chatRooms
                });
            }
        });
    }
});
exports.default = chatRoomRoutes;
