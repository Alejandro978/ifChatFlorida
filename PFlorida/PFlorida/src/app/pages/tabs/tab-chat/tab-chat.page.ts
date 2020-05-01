import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ChatRoom } from 'src/app/models/chatRoom.model';
import { ChatRoomService } from 'src/app/services/chatRoom-service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab-chat',
  templateUrl: 'tab-chat.page.html',
  styleUrls: ['tab-chat.page.scss'],
})
export class TabChatPage implements OnInit {

  // chats: Chat[] = [];
  userInfo: any;
  idRol: number;
  chatRooms: ChatRoom[] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    private storage: Storage,
    private modalCtrl: ModalController,
    private chatRoomService: ChatRoomService
  ) { }

  async ngOnInit() {
    await this.getUserInfo();
    await this.getChatRoomsByEmail();

  }

  async getUserInfo() {
    this.userInfo = await this.storage.get('userInfo');
    this.idRol = +this.userInfo[0].idRol;

  }
  // 
  // onLogOut() {
  //   this.auth.logout();
  // }

  // getChatRooms() {
  // this.chatService.getChat().subscribe(chats => {
  //   this.chats = chats;
  // });

  async getChatRoomsByEmail() {
    this.chatRoomService.getChatRoomsByEmail(this.userInfo[0].user.email, this.userInfo[0].idRol).then((res: any) => {
      if (res.data) {
        this.chatRooms = res.data;
        console.log(this.chatRooms);
      }
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          console.log("Desconectarse");
        }
      }]
    });
    await actionSheet.present();
  }
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



