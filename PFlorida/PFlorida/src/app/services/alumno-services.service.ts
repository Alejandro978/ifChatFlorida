import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../..//environments/environment';
import { Alumno } from '../models/alumno.model';

const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) { }

  crearAlumno(alumno: Alumno) {
    return new Promise(resolve => {
      this.http.post(`${URL}/alumno/create`, alumno).subscribe(res => {
        if (res['ok']) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    });
  }

  agregarClaseAlumnoService(codigo, email) {
    let data: any = { codigo, email }
    console.log(data);

    return new Promise(resolve => {
      this.http.put(`${URL}/alumno/update`, data).subscribe(res => {
        if (res['ok']) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    });
  }

  //Se ejecuta cuando el Alumno elimina uno de sus códigos clase...
  eliminarCodigoClase(codigo, email) {
    let data: any = { codigo, email }
    console.log(data);

    return new Promise(resolve => {
      this.http.put(`${URL}/alumno/eliminarCodigoClase`, data).subscribe(res => {
        if (res['ok']) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    });
  }

  //Se ejecutará cuando el Profesor elimine una clase , se eliminará el código de clase
  //a todos los alumnos
  eliminarCodigosClase(codigo) {
    let data: any = { codigo }

    return new Promise(resolve => {
      this.http.put(`${URL}/alumno/eliminarCodigosClase`, data).subscribe(res => {
        if (res['ok']) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    });
  }



}
