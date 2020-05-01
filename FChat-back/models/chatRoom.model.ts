import { Schema, model, Document } from 'mongoose';

const chatRoomSchema = new Schema({

    emailAlumno: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    emailProfesor: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    avatar: {
        type: String,
        deault: 'av-4.png'
    },
    clase: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    // mensajes: [
    //     {
    //         texto:
    //         {
    //             type: { type: String }
    //         },
    //         fecha:
    //         {
    //             type: { type: Date }
    //         },
    //     }
    // ]
});

interface IChatRoom extends Document {
    emailAlumno: string,
    emailProfesor: string,
    avatar: string,
    clase: string,
    // mensajes: []
}

export const ChatRoom = model<IChatRoom>('ChatRoom', chatRoomSchema); 