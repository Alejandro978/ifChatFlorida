import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from 'src/models/profesor.model';
import { environment } from '../../environments/environment';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) { }

  crearProfesor(profesor: Profesor) {
    return new Promise(resolve => {
      this.http.post(`${URL}/alumno/create`, profesor).subscribe(res => {
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
