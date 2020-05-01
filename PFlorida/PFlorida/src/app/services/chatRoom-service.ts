import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profesor } from '../models/profesor.model';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  constructor(private http: HttpClient) { }


  getChatRoomsByEmail(email: any,idRol:any) {
    console.log(email);
    let data: any = { email,idRol };
    return new Promise(resolve => {
      this.http.get(`${URL}/chatRoom/getChatRoomByEmail`, { headers: data }).subscribe(res => {

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
