import Server from './classes/server';

import alumnoRoutes from './routes/alumno';
import profesorRoutes from './routes/profesor';
import loginRoutes from './routes/login';
import claseRoutes from './routes/clase';
import chatRoomRoutes from './routes/chatRoom';

import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import notasRoutes from './routes/notas';

const server = new Server();

//Middleware se ejecuta siempre antes de lanzar la petición a una de las 'Rutas de la app'
//Se encarga de transformar la información devuleta a un JSON legible.
//Body Parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//Rutas de la app
server.app.use('/profesor', profesorRoutes);
server.app.use('/alumno', alumnoRoutes);
server.app.use('/clase', claseRoutes);
server.app.use('/login', loginRoutes);
server.app.use('/chatRoom', chatRoomRoutes);
server.app.use('/nota', notasRoutes);



//Configurar cors
server.app.use(cors({ origin: true, credentials: true }));

//Conectar bbdd
mongoose.connect('mongodb://localhost:27017/florichat', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log('BBDD ONLINE');
    }
})


//Levantamos express:
server.start(() => {
    console.log(`Servidor corriendo en puerto:${server.port}`);
});