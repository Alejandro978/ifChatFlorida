"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notasSchema = new mongoose_1.Schema({
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
exports.Notas = mongoose_1.model('Notas', notasSchema);
