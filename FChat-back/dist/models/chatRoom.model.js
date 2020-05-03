"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mensajesSchema = new mongoose_1.Schema({
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
});
const chatRoomSchema = new mongoose_1.Schema({
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
exports.ChatRoom = mongoose_1.model('ChatRoom', chatRoomSchema);
