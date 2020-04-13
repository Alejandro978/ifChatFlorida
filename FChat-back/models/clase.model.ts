import { Schema, model, Document } from 'mongoose';

const claseSchema = new Schema({

    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    codigo: {
        type: Number,
        required: [true, 'El rol es obligatorio'],
        unique: true,
    },
    avatar: {
        type: String,
        deault: 'av-4.png'
    }
    
});

interface IClase extends Document {
    email: string,
    nombre: string,
    codigo: string,
    avatar: string
}

export const Clase = model<IClase>('Clases', claseSchema); 