import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";
import { Mensaje } from 'src/app/models/mensaje.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
})
export class ChatModalComponent implements OnInit {

  chat: any;
  msg: string;
  sala: any

  constructor(private navParams: NavParams, private modalCtrl: ModalController, private chatService: ChatService) { }

  ngOnInit() {
    this.chat = this.navParams.get('chat');

    this.chatService.getChats(this.chat.IdChat).subscribe(mensajesSala => {
      this.sala = mensajesSala;
    });


  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  sendMessage() {
    if (!!this.msg) {
      const mesaje: Mensaje = {
        Contenido: this.msg,
        Tipo: 'text',
        Date: new Date()
      }
      this.chatService.sendToMsgToFireBaseRoom(mesaje, this.chat.IdChat);
      this.msg = '';
    }
  }
}