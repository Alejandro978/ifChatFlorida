import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { ChatRoom } from "../models/chatRoom.model";



const chatRoomRoutes = Router();

chatRoomRoutes.post('/create', (req: Request, res: Response) => {

    const chatRoom = {
        emailAlumno: req.body.emailAlumno,
        emailProfesor: req.body.emailProfesor,
        clase: req.body.clase,
        avatar: req.body.avatar,
        // mensajes: req.body.mensajes
    }
    ChatRoom.create(chatRoom).then(profesorDb => {

        //Si se consigue crear el usuario , la respuesta userDB será devuelta:

        res.json({
            ok: true,
            res: "Creado con exito"
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })

});

//Obtiene las salas de chat de un usuario por su email
chatRoomRoutes.get('/getChatRoomByEmail', (req: Request, res: Response) => {
    let email: any = req.headers.email;
    if (req.headers.idrol === "1") {
        ChatRoom.find({ emailProfesor: email }, (err, chatRooms) => {

            if (!chatRooms) {
                return res.json({
                    ok: false,
                    mensaje: 'No existen clases para este profesor.'
                })
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
        ChatRoom.find({ emailAlumno: email }, (err, chatRooms) => {

            if (!chatRooms) {
                return res.json({
                    ok: false,
                    mensaje: 'No existen clases para este alumno.'
                })
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


export default chatRoomRoutes;