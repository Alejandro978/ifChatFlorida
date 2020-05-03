"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatRoom_model_1 = require("../models/chatRoom.model");
const chatRoomRoutes = express_1.Router();
chatRoomRoutes.post('/create', (req, res) => {
    const chatRoom = {
        emailProfesor: req.body.emailProfesor,
        emailAlumno: req.body.emailAlumno,
        clase: req.body.clase,
        mensajes: []
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
//Método para obtener salas que coincidan con email profesor y alumno
//para comprobar si están repetidos...
chatRoomRoutes.get('/getChatRoomByEmails', (req, res) => {
    let emailProfesor = req.headers.emailprofesor;
    let emailAlumno = req.headers.emailalumno;
    chatRoom_model_1.ChatRoom.find({ emailProfesor: emailProfesor, emailAlumno: emailAlumno }, (err, chatRooms) => {
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
});
chatRoomRoutes.delete('/delete', (req, res) => {
    //TODO:Eliminar también CHATS ABIERTOS QUE CONTENGAN ESTA CLASE.
    let emailAlumno = req.headers.emailalumno;
    let emailProfesor = req.headers.emailprofesor;
    console.log(emailAlumno);
    console.log(emailProfesor);
    chatRoom_model_1.ChatRoom.deleteOne({ emailAlumno: emailAlumno, emailProfesor: emailProfesor }, function (err) {
        if (err) {
            res.json({
                ok: false,
                mensaje: 'Ha habido un problema al eliminar la Clase'
            });
            throw (err);
        }
        else {
            res.json({
                ok: true,
                mensaje: 'Sala de chat eliminada con exito'
            });
        }
    });
});
exports.default = chatRoomRoutes;
