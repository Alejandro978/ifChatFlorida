import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = null;

  constructor(private http: HttpClient, private storage: Storage) { }

  login(email: string, password: string) {

    const data = { email, password }

    return new Promise(resolve => {

      this.http.post(`${URL}/login/login`, data).subscribe(res => {
        console.log(res);
        if (res['ok']) {
          this.guardarToken(res['token'], res['user'], res['idRol'], res['clases']);
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

  async guardarToken(token: string, user: any, idRol: any, clases: string[]) {
    this.token = token;
    let userInfo = [{ 'token': token, 'user': user, 'idRol': idRol }];
    await this.storage.set('userInfo', userInfo);
  }
}
