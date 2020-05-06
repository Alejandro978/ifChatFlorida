"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const alumno_1 = __importDefault(require("./routes/alumno"));
const profesor_1 = __importDefault(require("./routes/profesor"));
const login_1 = __importDefault(require("./routes/login"));
const clase_1 = __importDefault(require("./routes/clase"));
const chatRoom_1 = __importDefault(require("./routes/chatRoom"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const notas_1 = __importDefault(require("./routes/notas"));
const server = new server_1.default();
//Middleware se ejecuta siempre antes de lanzar la petición a una de las 'Rutas de la app'
//Se encarga de transformar la información devuleta a un JSON legible.
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Rutas de la app
server.app.use('/profesor', profesor_1.default);
server.app.use('/alumno', alumno_1.default);
server.app.use('/clase', clase_1.default);
server.app.use('/login', login_1.default);
server.app.use('/chatRoom', chatRoom_1.default);
server.app.use('/nota', notas_1.default);
//Configurar cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Conectar bbdd
mongoose_1.default.connect('mongodb://localhost:27017/florichat', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log('BBDD ONLINE');
    }
});
//Levantamos express:
server.start(() => {
    console.log(`Servidor corriendo en puerto:${server.port}`);
});
