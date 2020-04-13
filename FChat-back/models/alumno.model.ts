import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const alumnoSchema = new Schema({

    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    avatar: {
        type: String,
        deault: 'av-4.png'
    },
    idRol: {
        type: Number,
        required: [true, 'El rol es obligatorio'],
        default: 2
    },
    clases: [{
        type: String,
        unique: true,
    }]
});

alumnoSchema.method('compararPassword', function (password: string = ''): boolean {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});

interface IAlumno extends Document {
    nombre: string,
    avatar: string,
    email: string,
    password: string,
    idRol: number,
    clases: string[]

    compararPassword(password: string): boolean;

}

export const Alumno = model<IAlumno>('Alumnos', alumnoSchema); 