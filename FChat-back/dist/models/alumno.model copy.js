"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const alumnoSchema = new mongoose_1.Schema({
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
        required: [true, 'El rol es obligatorio']
    }
});
exports.Alumno = mongoose_1.model('Alumnos', alumnoSchema);
