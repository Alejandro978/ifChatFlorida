import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const profesorSchema = new Schema({

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
        deault: 'av-1.png'
    },
    idRol: {
        type: Number,
        required: [true, 'El rol es obligatorio']
    },

});


profesorSchema.method('compararPassword', function (password: string = ''): boolean {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});

interface IProfesor extends Document {
    email: string,
    password: string,
    nombre: string,
    avatar: string

    compararPassword(password: string): boolean;
}

export const Profesor = model<IProfesor>('Profesores', profesorSchema); 