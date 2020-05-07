import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const notasSchema = new Schema({

    titulo: {
        type: String,
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
    fecha: {
        type: Date,
        required: [true, 'Fecha obligatoria']
    },
});



interface INotas extends Document {
    titulo: string,
    descripcion: string,
    email: string,
    fecha: Date
}

export const Notas = model<INotas>('Notas', notasSchema); 