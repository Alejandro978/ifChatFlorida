import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;

  constructor(private http: HttpClient, private storage: Storage, private navController: NavController) { }

  login(email: string, password: string) {

    const data = { email, password }

    return new Promise(resolve => {

      this.http.post(`${URL}/login/login`, data).subscribe(res => {
        console.log(res);
        if (res['ok']) {
          console.log(res);
          this.guardarToken(res['token'], res['user'], res['idRol'], res['clases'], res['nombreProfesor'], res['nombreAlumno']);
          resolve(true);
        }
        else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });


  }

  async guardarToken(token: string, user: any, idRol: any, clases: string[], nombreProfesor: string, nombreAlumno: string) {
    this.token = token;
    let userInfo = [{ 'token': token, 'user': user, 'idRol': idRol, 'nombreProfesor': nombreProfesor, 'nombreAlumno': nombreAlumno }];
    await this.storage.set('userInfo', userInfo);
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();
    console.log(this.token);

    if (!this.token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });


      this.http.get(`${URL}/login/`, { headers }).subscribe(res => {
        console.log(res);

        if (res['ok']) {
          resolve(true);
        }
        else {
          this.navController.navigateRoot('/login');
          resolve(false);
        }
      })
    });
  }

  async cargarToken() {

    let userInfo = await this.storage.get('userInfo');
    if (!!userInfo) {
      this.token = userInfo[0].token || null;
    }
    else {
      this.navController.navigateRoot('/login');
    }

  }

}
