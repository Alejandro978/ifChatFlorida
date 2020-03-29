import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ChatService } from "../../services/chat.service";
import { Chat } from '../../models/chat.model';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ChatModalComponent } from '../../components/chat-modal/chat-modal.component';
import { Mensaje } from '../../models/mensaje.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  chats: Chat[] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    private auth: AuthService, private chatService: ChatService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    await this.getChats();

  }



  onLogOut() {
    this.auth.logout();
  }

  getChats() {
    this.chatService.getChat().subscribe(chats => {
      this.chats = chats;
    });
  }

  openChat(chat) {
    this.modalCtrl.create({
      component: ChatModalComponent,
      componentProps: {
        chat: chat
      }
    }).then((modal) => {
      modal.present();
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.onLogOut();
        }
      }]
    });
    await actionSheet.present();
  }

}
