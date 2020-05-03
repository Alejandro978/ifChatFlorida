import { Mensaje } from './mensaje.model';

export class ChatRoom {
    emailProfesor: string;
    emailAlumno: string;
    clase: string;
    mensajes:Mensaje[];
}
