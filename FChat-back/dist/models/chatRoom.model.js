"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatRoomSchema = new mongoose_1.Schema({
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
});
exports.ChatRoom = mongoose_1.model('ChatRoom', chatRoomSchema);
