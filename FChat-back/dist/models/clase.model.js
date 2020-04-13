"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const claseSchema = new mongoose_1.Schema({
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
exports.Clase = mongoose_1.model('Clases', claseSchema);
