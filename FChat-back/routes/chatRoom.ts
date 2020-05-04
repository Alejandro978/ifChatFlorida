import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { ChatRoom } from "../models/chatRoom.model";



const chatRoomRoutes = Router();

chatRoomRoutes.post('/create', (req: Request, res: Response) => {

    const chatRoom = {
        emailProfesor: req.body.emailProfesor,
        emailAlumno: req.body.emailAlumno,
        clase: req.body.clase,
        mensajes: []
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

//Método para obtener salas que coincidan con email profesor y alumno
//para comprobar si están repetidos...
chatRoomRoutes.get('/getChatRoomByEmails', (req: Request, res: Response) => {
    let emailProfesor: any = req.headers.emailprofesor;
    let emailAlumno: any = req.headers.emailalumno;

    ChatRoom.find({ emailProfesor: emailProfesor, emailAlumno: emailAlumno }, (err, chatRooms) => {
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
});


chatRoomRoutes.delete('/delete', (req: Request, res: Response) => {

    //TODO:Eliminar también CHATS ABIERTOS QUE CONTENGAN ESTA CLASE.
    let emailAlumno: any = req.headers.emailalumno;
    let emailProfesor: any = req.headers.emailprofesor;
    console.log(emailAlumno);
    console.log(emailProfesor);


    ChatRoom.deleteOne({ emailAlumno: emailAlumno, emailProfesor: emailProfesor }, function (err) {
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

//Añadir nuevos mensajes al chatRoom:

chatRoomRoutes.put('/update', (req: any, res: Response) => {
console.log(req.body);

    // Se comprueba si el usuario ya tiene el código clase registrado:
    ChatRoom.find({ emailAlumno: req.body.emailAlumno, emailProfesor: req.body.emailProfesor }, function (err, result) {
        //La sala de chat existe por lo que intentará pusear los nuevos mensajes..
        if (result.length > 0) {

            ChatRoom.updateOne(
                { emailAlumno: req.body.emailAlumno,emailProfesor:req.body.emailProfesor },
                { $push: { mensajes: [req.body.mensaje] } },
                function (err, result) {



                    if (err) {
                        res.json({
                            ok: false,
                            mensaje: err
                        })
                    } else {
                        res.json({
                            ok: true,
                            mensaje: 'Clase registrada con exito'
                        })
                    }
                }
            );
        }
    });
});


export default chatRoomRoutes;