import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, ActionSheetController, LoadingController } from '@ionic/angular';

import * as _ from 'lodash';
import { TabClaseModalComponent } from './tab-clase-modal/tab-clase-modal.component';
import { ClaseService } from 'src/app/services/clase.service';
import { Storage } from '@ionic/storage';
import { RolesEnum } from '../../../models/enums/rolesEnum';
import { Clase } from '../../../models/clase.model';
import { AlumnoService } from 'src/app/services/alumno-services.service';
import { TabAlumnosClasePage } from './tab-alumnos-clase/tab-alumnos-clase.page';
import { ChatRoomService } from 'src/app/services/chatRoom-service';
import { ChatRoom } from 'src/app/models/chatRoom.model';
import { Router } from '@angular/router';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-tab-clase',
  templateUrl: 'tab-clase.page.html',
  styleUrls: ['tab-clase.page.scss'],
})
export class TabClasePage {
  idRol: number;
  userInfo: any;
  rolesEnum: RolesEnum = new RolesEnum();
  clases: Clase[] = [];
  codigoClase: string;
  codigoClasesAlumno: string[] = [];
  claseExistente: boolean = false;
  titulo: string = "Clases";
  avatar: string;
  nombre: string;
  public loading: any;

  constructor(
    private modalCtrl: ModalController,
    private claseService: ClaseService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private alumnoService: AlumnoService,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private chatRoomService: ChatRoomService,
    public router: Router,
    private uiService: UiServiceService
  ) {
  }

  async ionViewWillEnter() {
    //Desde este método si es rol alumno se obtienen las clases del profesor
    await this.getUserInfo();

    if (this.idRol === this.rolesEnum.rolProfesor) {
      await this.getClasesProfesor();
    }
  }
  //TODO:FALTA RECARGAR ESTE MÉTODO UNA VEZ AÑADIDA UNA CALSE NUEVA
  async getClasesProfesor() {
    this.claseService.getClasesByEmail(this.userInfo[0].user.email).then((res: any) => {
      if (res.data) {
        this.clases = res.data;
      }
    });
  }

  async getClasesAlumno() {
    this.claseService.getAll().then((res: any) => {
      // this.presentLoading('Loading...');
      if (res.data) {
        this.filtrarClasesAlumno(res.data);
      }
    });
  }
  async filtrarClasesAlumno(listadoClases: Clase[]) {
    this.clases = [];
    listadoClases.forEach(clasesRegistrada => {
      this.codigoClasesAlumno.forEach((codigoClasesAlumno: string) => {
        if (clasesRegistrada.codigo === codigoClasesAlumno) {
          this.clases.push(clasesRegistrada);
        }
      });
    });

  }

  async crearClase() {

    if (this.idRol === this.rolesEnum.rolProfesor) {
      this.modalCtrl.create({
        component: TabClaseModalComponent,
        componentProps: {
          userInfo: this.userInfo[0].user,
          idRol: this.idRol,
          nombreProfesor: this.userInfo[0].nombreProfesor
        }
      }).then((modal) => {
        modal.present();

        modal.onDidDismiss().then(created => {
          if (created) {
            this.getClasesProfesor();
          }
        });
      });
    }

    else {
      let alert = this.alertCtrl.create({
        header: `Unirme a una Clase`,
        subHeader: `Ingresa el código de la clase a la que deseas unirte:`,
        inputs: [
          {
            name: 'codigo',
            type: 'text',
            placeholder: 'Código'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.alertCtrl.dismiss()
            }
          },
          {
            text: 'Aceptar',
            handler: (data) => {
              this.consultarAsignacionClaseAlumno(data.codigo);
            }
          }
        ]
      });
      await (await alert).present();
    }
  }


  async consultarAsignacionClaseAlumno(codigo) {
    this.claseService.getClasesByCodigoClase(codigo).then((res: any) => {
      if (res.data) {
        this.agregarClaseAlumno(codigo);
      }
      else {
        this.uiService.presentAlert('Parece que no existe una Clase con este código, introduzca otro')
      }
    });
  }

  agregarClaseAlumno(codigo) {
    this.alumnoService.agregarClaseAlumnoService(codigo, this.userInfo[0].user.email).then(res => {
      if (res) {
        this.getCodigosClase();
        this.toastRegistradoConExito();
      }
      else {
        this.toastClaseRepetida();
      }
    });
  }

  async getUserInfo() {
    this.userInfo = await this.storage.get('userInfo');
    this.idRol = +this.userInfo[0].idRol;
    this.avatar = this.userInfo[0].avatar;
    if (this.idRol === 2) {
      await this.getCodigosClase();
      this.nombre = "Alumn@: " + this.userInfo[0].nombreAlumno;
    }
    else {
      this.nombre = "Profesor/a: " + this.userInfo[0].nombreProfesor;
    }
  }

  async getCodigosClase() {
    await this.claseService.getCodigosClaseAlumno(this.userInfo[0].user.email).then((res: any) => {
      if (res) {
        this.codigoClasesAlumno = res.data;
        this.getClasesAlumno();
      }
    });
  }



  eliminarClaseAlumno(clase: Clase) {

    this.alumnoService.eliminarCodigoClase(clase.codigo, this.userInfo[0].user.email).then(res => {
      if (res) {
        this.toastClaseEliminada();
        this.getCodigosClase();
        this.getClasesAlumno();
      }
      else {
        this.toastClaseNoExistente();
      }

    })
  }

  eliminarClaseProfesor(clase: Clase) {
    let codigo = clase.codigo;

    this.claseService.deleteClaseByCodigo(codigo).then(res => {
      if (res) {
        this.toastClaseEliminada();
        this.getClasesProfesor();
        this.alumnoService.eliminarCodigosClase(codigo);
      }
      else {
        this.toastClaseNoExistente();
      }
    });
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: message,
      duration: 2000
    });
    return await this.loading.present();
  }

  async mostrarUsuarios(clase: Clase) {
console.log(clase.codigo);

    this.modalCtrl.create({
      component: TabAlumnosClasePage,
      componentProps: {
        codigo: clase.codigo,
        emailProfesor: this.userInfo[0].user.email,
        nombreClase: clase.nombre,
        nombreProfesor: this.userInfo[0].nombreProfesor
      }
    }).then((modal) => {
      modal.present();
    });
  }

  async abrirChat(clase: Clase) {
    await this.claseExiste(clase.codigo, clase);
  }

  //Método para el alumno
  async comprobarChatRoomExistente(clase: Clase) {
    console.log(clase);

    this.chatRoomService.getChatRoomsByEmails(this.userInfo[0].user.email, clase.email, clase.codigo).then((res: any) => {
      if (res.data.length === 0) {
        this.crearChatRoom(this.userInfo[0].user.email, clase);
      }
      else {
        this.toastChatRoomRepetido(clase.nombre);
        this.router.navigate(['/tabs/chat']);

      }
    });
  }

  async claseExiste(codigoClase, clase) {
    this.claseService.getClasesByCodigoClase(codigoClase).then(res => {
      if (res) {
        this.comprobarChatRoomExistente(clase);
      }
      else {
        this.toastClaseNoExistente();
        this.getClasesAlumno();
      }
    })
  }

  async crearChatRoom(emailAlumno, clase: Clase) {
    //Se crea el chatRoom y se mapea:
    let chatRoom = new ChatRoom();
    chatRoom.clase = clase.nombre;
    chatRoom.emailAlumno = emailAlumno;
    chatRoom.emailProfesor = clase.email;
    chatRoom.nombreProfesor = clase.nombreProfesor;
    chatRoom.nombreAlumno = this.userInfo[0].nombreAlumno;
    chatRoom.codigoClase = clase.codigo;


    this.chatRoomService.crearChatRoom(chatRoom).then((res: any) => {
      if (res) {
        this.toastChatRoomCreado(clase.nombre);
        this.router.navigate(['/tabs/chat']);

      }
      else {
        this.uiService.presentAlert('Parece que esta clase ha sido eliminada');
      }
    });
  }

  //Toasts ------------------------ >
  async toastRegistradoConExito() {
    const toast = await this.toastCtrl.create({
      message: '¡Enhorabuena te has registrado con exito!',
      duration: 2000
    });
    toast.present();
  }

  async toastClaseRepetida() {
    const toast = await this.toastCtrl.create({
      message: '¡Ya estás registrado a esta Clase!',
      duration: 2000
    });
    toast.present();
  }

  async toastClaseEliminada() {
    const toast = await this.toastCtrl.create({
      message: 'Clase eliminada con exito!',
      duration: 2000
    });
    toast.present();
  }

  async toastClaseNoExistente() {
    const toast = await this.toastCtrl.create({
      message: 'Parece que esta clase ya no existe!',
      duration: 2000
    });
    toast.present();
  }
  async toastChatRoomRepetido(nombreClase) {
    const toast = await this.toastCtrl.create({
      message: 'Ya tienes un chat abierto para la clase de ' + nombreClase + '!',
      duration: 2000
    });
    toast.present();
  }

  async toastChatRoomCreado(nombreClase) {
    const toast = await this.toastCtrl.create({
      message: 'Se ha creado un chat para la clase de ' + nombreClase + '!',
      duration: 2000
    });
    toast.present();
  }

  async toastChatRoomError() {
    const toast = await this.toastCtrl.create({
      message: 'Parece que esta clase ya no existe...',
      duration: 2000
    });
    toast.present();
  }
}