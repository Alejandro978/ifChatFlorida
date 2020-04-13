import { Alumno } from './alumno.model';

export class Clase {
    IdClase: string;
    IdProfesor: number;
    Nombre: string;
    CodigoClase: string;
    NombreProfesor:string;
    alumnos: Alumno[];
}
