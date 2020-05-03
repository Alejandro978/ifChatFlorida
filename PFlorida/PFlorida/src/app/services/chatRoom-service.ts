import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profesor } from '../models/profesor.model';
import { ChatRoom } from '../models/chatRoom.model';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  constructor(private http: HttpClient) { }

//Obtiene las salas de chat de un usuario
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

  //Método para comprobar si una chatroom ya está creada -->
  
  getChatRoomsByEmails(emailAlumno:string,emailProfesor:string) {
    let data: any = { emailProfesor,emailAlumno };
    return new Promise(resolve => {
      this.http.get(`${URL}/chatRoom/getChatRoomByEmails`, { headers: data }).subscribe(res => {

        if (res['ok']) {
          resolve(res);
        }
        else {
          resolve(false);
        }
      })
    });
  }

  crearChatRoom(chatRoom: ChatRoom) {
    return new Promise(resolve => {
      this.http.post(`${URL}/chatRoom/create`, chatRoom).subscribe(res => {
        if (res['ok']) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    });
  }

  deleteChatRoomByEmails(emailAlumno,emailProfesor) {
    let data: any = { emailAlumno,emailProfesor };

    return new Promise(resolve => {
      this.http.delete(`${URL}/chatRoom/delete`, { headers: data }).subscribe(res => {

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
