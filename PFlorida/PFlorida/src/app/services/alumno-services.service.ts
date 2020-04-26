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

}
