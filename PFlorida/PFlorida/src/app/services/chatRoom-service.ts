import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profesor } from '../models/profesor.model';
import { ChatRoom } from '../models/chatRoom.model';
import { Mensaje } from '../models/mensaje.model';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  constructor(private http: HttpClient) { }

  //Obtiene las salas de chat de un usuario
  getChatRoomsByEmail(email: any, idRol: any) {
    console.log(email);
    let data: any = { email, idRol };
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
  getChatRoomsByEmails(emailAlumno: string, emailProfesor: string, codigoClase: string) {
    let data: any = { emailProfesor, emailAlumno, codigoClase };
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

  deleteChatRoomByEmails(emailAlumno, emailProfesor) {
    let data: any = { emailAlumno, emailProfesor };

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

  enviarMensaje(datosMensaje: any) {
    let emailAlumno = datosMensaje.emailAlumno;
    let emailProfesor = datosMensaje.emailProfesor;
    let mensaje = new Mensaje();
    mensaje.date = new Date();
    mensaje.date.setMonth(mensaje.date.getMonth() + 1);
    mensaje.idRol = datosMensaje.idRol.toString();
    mensaje.texto = datosMensaje.texto;
    mensaje.titulo = datosMensaje.titulo;
    mensaje.enviadoPor = datosMensaje.enviadoPor;
    let data: any = { emailAlumno, emailProfesor, mensaje }

    return new Promise(resolve => {
      this.http.put(`${URL}/chatRoom/update`, data).subscribe(res => {
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
