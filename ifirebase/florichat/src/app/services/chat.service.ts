import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Chat } from '../models/chat.model';
import { Mensaje } from '../models/mensaje.model';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore) { }



  //Obtiene todos los chats de un profesor / alumno
  getChat() {
    //Se apunta a la coleccion con el nombre de firestore.
    return this.db.collection('chats').snapshotChanges().pipe(map(chats => {
      return chats.map(a => {
        //A este servicio se le llama desde un subscribe, por lo tanto siempre que hay cambios duplica la información en pantalla....
        //Se mapea para no obtener datos repetidos.
        const data = a.payload.doc.data() as Chat;
        data.IdChat = a.payload.doc.id;
        return data;
      })
    }));
  }

  //Obtiene los distintos mensajes por cada chat de un profesor / alumno
  getChats(chat_id: string) {
    return this.db.collection('chats').doc(chat_id).valueChanges();
  }

  sendToMsgToFireBaseRoom(mensaje: Mensaje, chat_id: string) {
    this.db.collection('chats').doc(chat_id).update({
      mensajes: firestore.FieldValue.arrayUnion(mensaje),
    });
  }

}
