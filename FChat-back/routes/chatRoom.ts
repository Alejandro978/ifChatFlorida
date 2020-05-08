import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { ChatRoom } from "../models/chatRoom.model";



const chatRoomRoutes = Router();

chatRoomRoutes.post('/create', (req: Request, res: Response) => {

    console.log(req.body);

    const chatRoom = {
        emailProfesor: req.body.emailProfesor,
        emailAlumno: req.body.emailAlumno,
        clase: req.body.clase,
        mensajes: [],
        nombreAlumno: req.body.nombreAlumno,
        nombreProfesor: req.body.nombreProfesor,
        codigoClase: req.body.codigoClase
    }

    ChatRoom.create(chatRoom).then(chatRoomDb => {

        res.json({
            ok: true,
            res: "Creado con exito"
        });

    }).catch(err => {
        res.json({
            ok: false,
            res: err

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
    let codigoClase: any = req.headers.codigoclase;

    console.log(req.headers);

    ChatRoom.find({ emailProfesor: emailProfesor, emailAlumno: emailAlumno, codigoClase: codigoClase }, (err, chatRooms) => {
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
            console.log("AQUI");

            ChatRoom.updateOne(
                { emailAlumno: req.body.emailAlumno, emailProfesor: req.body.emailProfesor },
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
        else {
            res.json({
                ok: false,
                mensaje: '¡El Chat fué eliminado!'
            })
        }
    });
});


export default chatRoomRoutes;