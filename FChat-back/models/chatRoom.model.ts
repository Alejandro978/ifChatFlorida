import { Schema, model, Document } from 'mongoose';

const mensajesSchema = new Schema({
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
    }
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
    mensajes: [mensajesSchema]
});

interface IChatRoom extends Document {
    emailAlumno: string,
    emailProfesor: string,
    avatar: string,
    clase: string,
    mensajes:[]
}

export const ChatRoom = model<IChatRoom>('ChatRoom', chatRoomSchema); 