import { Mensaje } from './mensaje.model';

export class ChatRoom {
    nombreAlumno:string;
    nombreProfesor:string;
    emailProfesor: string;
    emailAlumno: string;
    clase: string;
    mensajes:Mensaje[];
}
