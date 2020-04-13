import { Clase } from './clase.model';

export class Alumno {
    idAlumno: string;
    Email: string;
    Contrasenya: string;
    Nombre: string;
    Apellidos: string;
    IdRol: number;
    clases: Clase[];
}
