"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        required: [true, 'El rol es obligatorio'],
        default: 2
    },
    clases: [{
            type: String,
        }]
});
alumnoSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Alumno = mongoose_1.model('Alumnos', alumnoSchema);
