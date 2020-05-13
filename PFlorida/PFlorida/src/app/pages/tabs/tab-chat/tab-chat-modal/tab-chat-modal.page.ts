import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { ChatRoomService } from 'src/app/services/chatRoom-service';
import { VMensaje } from 'src/app/models/views/VMensaje.model';
import { Mensaje } from 'src/app/models/mensaje.model';
import { interval, Subscription } from 'rxjs';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-tab-chat-modal',
  templateUrl: './tab-chat-modal.page.html',
  styleUrls: ['./tab-chat-modal.page.scss'],
})
export class TabChatModalComponent implements OnInit {

  @Input() idRol: any;
  @Input() titulo: string;
  @Input() emailAlumno: string;
  @Input() emailProfesor: string;
  @Input() codigoClase: string;
  @Input() nombreProfesor: string;
  @Input() nombreAlumno: string;
  @Input() nombreClase: string;
  mensaje: string;


  texto: string;
  mensajes: Mensaje[];
  subscription: Subscription;
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private chatRoomService: ChatRoomService,
    private uiService: UiServiceService
  ) { }

  async ngOnInit() {
    console.log(this.nombreAlumno);
    console.log(this.nombreProfesor);

    await this.getChatRoomByEmails();

    const source = interval(3000);
    const text = 'Your Text Here';
    this.subscription = source.subscribe(val => this.getChatRoomByEmails());

  }

  cerrar() {
    this.subscription.unsubscribe();
    this.modalCtrl.dismiss();
  }

  async abrirAlertMensaje() {
    let alert = this.alertCtrl.create({
      header: `Mensaje`,
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Titulo'
        },
        {
          name: 'mensaje',
          type: 'textarea',
          placeholder: 'Mensaje'

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
            // this.enviarMensaje(data.titulo, data.mensaje);
          }
        }
      ]
    });
    await (await alert).present();
  }


  async getChatRoomByEmails() {
    this.chatRoomService.getChatRoomsByEmails(this.emailAlumno, this.emailProfesor, this.codigoClase).then((res: any) => {
      this.mensajes = res.data[0].mensajes;
    });
  }



  async enviarMensaje() {
    this.titulo = "sinValor";
    if (!!this.titulo && !!this.mensaje) {
      let datosMensaje: VMensaje = new VMensaje();
      datosMensaje.emailAlumno = this.emailAlumno;
      datosMensaje.emailProfesor = this.emailProfesor;
      datosMensaje.idRol = this.idRol;
      datosMensaje.texto = this.mensaje;
      datosMensaje.titulo = this.titulo;
      if (this.idRol === 1) {
        datosMensaje.enviadoPor = this.emailProfesor;
      }
      else {
        datosMensaje.enviadoPor = this.emailAlumno;
      }


      this.chatRoomService.enviarMensaje(datosMensaje).then((res: any) => {
        if (res) {
          this.getChatRoomByEmails();
          this.mensaje = "";
        }
        else {
          this.modalCtrl.dismiss(true);
          this.uiService.presentAlert('Parece que este chat ha sido Eliminado');

        }
      });
    }
    else {
      // await this.toastNoEnviado();
    }
  }


  async toastNoEnviado() {
    const toast = await this.toastCtrl.create({
      message: 'Titulo y Descripción obligatorios, Vuelve a intentarlo!!',
      duration: 2000
    });
    toast.present();
  }

  async toastEnviado() {
    const toast = await this.toastCtrl.create({
      message: 'Mensaje enviado correctamente!!',
      duration: 2000
    });
    toast.present();
  }

  getDate(date) {
    let fechaDevolver = new Date(date);
    return fechaDevolver.getDate() + "/" + fechaDevolver.getMonth() + "/" + fechaDevolver.getFullYear();

  }

}
