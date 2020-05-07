import { Schema, model, Document } from 'mongoose';

const mensajesSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El texto es obligatorio']
    },
    texto: {
        type: String,
        required: [true, 'El texto es obligatorio']
    },
    idRol: {
        type: Number,
        required: [true, 'El rol es obligatorio']
    },
    date: {
        type: Date,
        required: [true, 'Fecha obligatoria']
    },
    enviadoPor: {
        type: String,
        required: [true, 'Enviado por es obligatorio']
    },
   
})

const chatRoomSchema = new Schema({

    emailAlumno: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    emailProfesor: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    clase: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    nombreAlumno: {
        type: String,
        required: [false, 'El correo es obligatorio']
    },
    nombreProfesor: {
        type: String,
        required: [false, 'El correo es obligatorio']
    },
    codigoClase: {
        type: String,
        required: [true, 'Código clase obligatorio']
    },

    mensajes: [mensajesSchema]
});

interface IChatRoom extends Document {
    emailAlumno: string,
    emailProfesor: string,
    avatar: string,
    clase: string,
    mensajes: [],
    nombreAlumno: string,
    nombreProfesor: string,
    codigoClase:string;
}

export const ChatRoom = model<IChatRoom>('ChatRoom', chatRoomSchema); 