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
        console.log(res);

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

}
