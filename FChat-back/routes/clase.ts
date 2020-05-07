import { Router, Request, Response } from "express";
import { Clase } from "../models/clase.model";



const claseRoutes = Router();

claseRoutes.post('/create', (req: Request, res: Response) => {
    console.log(req.body.nombreProfesor);

    const clase = {
        email: req.body.email,
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        avatar: req.body.avatar,
        nombreProfesor: req.body.nombreProfesor,
    }

    Clase.create(clase).then(claseDb => {
        //Si se consigue crear el usuario , la respuesta userDB será devuelta:
        res.json({
            ok: true,
            user: claseDb
        })

    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })


});

claseRoutes.get('/getClasesByEmail', (req: Request, res: Response) => {

    let email: any = req.headers.email;

    Clase.find({ email: email }, (err, listadoClases) => {

        let listadoClasesDevolver: any[] = [];
        //Se mapean las clases
        listadoClases.forEach(clases => {

            const clase = {
                email: clases.email,
                nombre: clases.nombre,
                avatar: clases.avatar,
                codigo: clases.codigo,
                nombreProfesor:clases.nombreProfesor
            };

            listadoClasesDevolver.push(clase);

        });


        if (!listadoClases) {
            return res.json({
                ok: false,
                mensaje: 'No existen clases para este profesor.'
            })
        }
        else {
            res.json({
                ok: true,
                data: listadoClasesDevolver
            });
        }
    });



});


claseRoutes.get('/getClasesByCodigo', (req: Request, res: Response) => {

    let codigo: any = req.headers.codigo;
    let clase: any;
    Clase.findOne({ codigo: codigo }, (err, resClase: any) => {
        if (err) throw err;
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
            })
        }
        else {
            res.json({
                ok: true,
                data: clase
            });
        }
    });
});

claseRoutes.get('/getAll', (req: Request, res: Response) => {


    Clase.find((err, resClase: any) => {
        if (err) throw err;

        if (!resClase) {
            return res.json({
                ok: false,
                mensaje: 'No existen clases con este código.'
            })
        }
        else {
            res.json({
                ok: true,
                data: resClase
            });
        }
    });
});


claseRoutes.delete('/delete', (req: Request, res: Response) => {

    let codigo: any = req.headers.codigo;

    Clase.deleteOne({ codigo: codigo }, function (err) {
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
                mensaje: 'Clase eliminada con exito'
            });
        }

    });

});




export default claseRoutes;