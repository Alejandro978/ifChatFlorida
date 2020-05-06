import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const notasSchema = new Schema({

    titulo: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    email: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    prioridad: {
        type: Number,
        required: [true, 'El rol es obligatorio']
    },
});



interface INotas extends Document {
    titulo: string,
    descripcion: string,
    email: string,
    prioridad: string

    compararPassword(password: string): boolean;
}

export const Notas = model<INotas>('Notas', notasSchema); 