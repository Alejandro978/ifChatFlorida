import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, ToastController } from '@ionic/angular';
import { ChatRoom } from 'src/app/models/chatRoom.model';
import { ChatRoomService } from 'src/app/services/chatRoom-service';
import { Storage } from '@ionic/storage';
import { RolesEnum } from 'src/app/models/enums/rolesEnum';
import { TabChatModalComponent } from './tab-chat-modal/tab-chat-modal.page';


@Component({
  selector: 'app-tab-chat',
  templateUrl: 'tab-chat.page.html',
  styleUrls: ['tab-chat.page.scss'],
})
export class TabChatPage {

  // chats: Chat[] = [];
  userInfo: any;
  idRol: number;
  chatRooms: ChatRoom[] = [];
  rolesEnum: RolesEnum = new RolesEnum();
  titulo: string = "Chat";
  avatar: string;
  nombre: string;

  constructor(
    public actionSheetController: ActionSheetController,
    private storage: Storage,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private chatRoomService: ChatRoomService
  ) { }

  async ionViewWillEnter() {
    await this.getUserInfo();
    await this.getChatRoomsByEmail();
  }



  async getUserInfo() {
    this.userInfo = await this.storage.get('userInfo');
    this.idRol = +this.userInfo[0].idRol;
    this.avatar = this.userInfo[0].avatar;
    if (this.idRol === 1) {
      this.nombre = "Profesor/a: "+ this.userInfo[0].nombreProfesor;
    }
    else {
      this.nombre = "Alumn@: "+ this.userInfo[0].nombreAlumno;
    }
  }


  async getChatRoomsByEmail() {
    this.chatRooms = [];

    this.chatRoomService.getChatRoomsByEmail(this.userInfo[0].user.email, this.userInfo[0].idRol).then((res: any) => {
      if (res.data) {
        this.chatRooms = res.data;
        console.log(this.chatRooms);
      }
    });


  }



  async eliminarChat(chat: ChatRoom) {
    if (this.userInfo[0].idRol === this.rolesEnum.rolProfesor.toString()) {
      this.chatRoomService.deleteChatRoomByEmails(chat.emailAlumno, this.userInfo[0].user.email).then(res => {
        if (res) {
          this.toastChatEliminado();
          this.getChatRoomsByEmail();
        }
        else {
          this.toastChatErrorEliminar();
        }
      });
    }
    else {
      this.chatRoomService.deleteChatRoomByEmails(this.userInfo[0].user.email, chat.emailProfesor).then(res => {
        if (res) {
          this.toastChatEliminado();
          this.getChatRoomsByEmail();
        }
        else {
          this.toastChatErrorEliminar();
        }
      });

    }
  }
  async abriChat(chat: ChatRoom) {
    let email: string;
    if (this.idRol === 1) {
      email = chat.emailAlumno;
    }
    else {
      email = chat.emailProfesor;
    }
    this.modalCtrl.create({
      component: TabChatModalComponent,
      componentProps: {
        idRol: this.idRol,
        titulo: email,
        emailProfesor: chat.emailProfesor,
        emailAlumno: chat.emailAlumno,
        codigoClase: chat.codigoClase,
        nombreProfesor:chat.nombreProfesor,
        nombreAlumno:chat.nombreAlumno,
        nombreClase:chat.clase
      }
    }).then((modal) => {
      modal.present();

      modal.onDidDismiss().then(created => {
        if (created) {
          this.getChatRoomsByEmail();
        }
      });
    })

  }

  async toastChatEliminado() {
    const toast = await this.toastCtrl.create({
      message: 'Chat eliminado con exito!',
      duration: 2000
    });
    toast.present();
  }

  async toastChatErrorEliminar() {
    const toast = await this.toastCtrl.create({
      message: 'Ha ocurrido un error al eliminar el chat!',
      duration: 2000
    });
    toast.present();
  }
}





