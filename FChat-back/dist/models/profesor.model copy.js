"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const profesorSchema = new mongoose_1.Schema({
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
profesorSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Profesor = mongoose_1.model('Profesores', profesorSchema);
