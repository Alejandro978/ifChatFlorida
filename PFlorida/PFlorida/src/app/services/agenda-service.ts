import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Nota } from '../models/nota.model';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  crearNota(nota: Nota) {
    return new Promise(resolve => {
      this.http.post(`${URL}/nota/create`, nota).subscribe(res => {
        if (res['ok']) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    });
  }

  //Método para comprobar si una chatroom ya está creada -->
  getNotasByEmail(email: string) {
    let data: any = { email };
    return new Promise(resolve => {
      this.http.get(`${URL}/nota/getNotasByEmail`, { headers: data }).subscribe(res => {

        if (res['ok']) {
          resolve(res);
        }
        else {
          resolve(false);
        }
      })
    });
  }

  deleteNotaById(_id: string) {
    let data: any = { _id };
    console.log(data);

    return new Promise(resolve => {
      this.http.delete(`${URL}/nota/delete`, { headers: data }).subscribe(res => {

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
