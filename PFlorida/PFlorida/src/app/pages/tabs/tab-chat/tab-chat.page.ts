import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-tab-chat',
  templateUrl: 'tab-chat.page.html',
  styleUrls: ['tab-chat.page.scss'],
})
export class TabChatPage implements OnInit {

  // chats: Chat[] = [];

  constructor(
    // public actionSheetController: ActionSheetController,
    // private auth: AuthService, 
    // private chatService: ChatService,
    // private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    //    await this.getChats();

  }


  // 
  // onLogOut() {
  //   this.auth.logout();
  // }

  // getChats() {
  // this.chatService.getChat().subscribe(chats => {
  //   this.chats = chats;
  // });
}

  // openChat(chat) {
    // this.modalCtrl.create({
    //   component: ChatModalComponent,
    //   componentProps: {
    //     chat: chat
    //   }
    // }).then((modal) => {
    //   modal.present();
    // })
  // }

  // async presentActionSheet() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Opciones',
  //     buttons: [{
  //       text: 'Desconectarse',
  //       role: 'destructive',
  //       icon: 'log-out',
  //       handler: () => {
  //         this.onLogOut();
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }

// }
