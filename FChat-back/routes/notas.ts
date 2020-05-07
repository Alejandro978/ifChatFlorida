import { Router, Request, Response } from "express";
import { Profesor } from "../models/profesor.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { Notas } from "../models/notas.model";


const notasRoutes = Router();

notasRoutes.post('/create', (req: Request, res: Response) => {

    const notas = {
        email: req.body.email,
        descripcion: req.body.descripcion,
        titulo: req.body.titulo,
        fecha: req.body.fecha
    }

    Notas.create(notas).then(notaDb => {

        res.json({
            ok: true,
            res: notaDb
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })

});

//Método para obtener salas que coincidan con email profesor y alumno
//para comprobar si están repetidos...
notasRoutes.get('/getNotasByEmail', (req: Request, res: Response) => {
    let email: any = req.headers.email;

    Notas.find({ email: email }, (err, notas) => {
        if (!notas) {
            return res.json({
                ok: false,
                mensaje: 'No existen clases para este profesor.'
            })
        }
        else {
            res.json({
                ok: true,
                data: notas
            });
        }
    });
});

notasRoutes.delete('/delete', (req: Request, res: Response) => {

    let _id: any = req.headers._id;

    Notas.deleteOne({ _id: _id }, function (err) {
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


export default notasRoutes;