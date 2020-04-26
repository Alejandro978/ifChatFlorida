import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clase } from '../models/clase.model';
import { environment } from '../../environments/environment';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(private http: HttpClient) { }

  crearClase(clase: Clase) {
    return new Promise(resolve => {
      this.http.post(`${URL}/clase/create`, clase).subscribe(res => {
        if (res['ok']) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    });
  }



  getClasesByEmail(email: any) {
    console.log(email);
    let data: any = { email };
    return new Promise(resolve => {
      this.http.get(`${URL}/clase/getClasesByEmail`, { headers: data }).subscribe(res => {

        if (res['ok']) {
          resolve(res);
        }
        else {
          resolve(false);
        }
      })
    });
  }


  getClasesByCodigoClase(codigo: string) {
    let data: any = { codigo };

    return new Promise(resolve => {
      this.http.get(`${URL}/clase/getClasesByCodigo`, { headers: data }).subscribe(res => {

        if (res['ok']) {
          resolve(res);
        }
        else {
          resolve(false);
        }
      })
    });
  }

  deleteClaseByCodigo(codigo: string) {
    let data: any = { codigo };
    console.log(data);

    return new Promise(resolve => {
      this.http.delete(`${URL}/clase/delete`, { headers: data }).subscribe(res => {

        if (res['ok']) {
          resolve(res);
        }
        else {
          resolve(false);
        }
      })
    });
  }



  getAll() {
    return new Promise(resolve => {
      this.http.get(`${URL}/clase/getAll`).subscribe(res => {

        if (res['ok']) {
          resolve(res);
          console.log(res);

        }
        else {
          resolve(false);
        }
      })
    });
  }

  getCodigosClaseAlumno(email: any) {

    let data: any = { email };


    return new Promise(resolve => {
      this.http.get(`${URL}/alumno/getCodigosClaseAlumno`, { headers: data }).subscribe(res => {

        if (res['ok']) {
          resolve(res);
        }
        else {
          resolve(false);
        }
      })
    });
  }

}
