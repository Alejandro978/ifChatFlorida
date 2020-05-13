import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno-services.service';
import { Alumno } from 'src/app/models/alumno.model';
import { ChatRoomService } from 'src/app/services/chatRoom-service';
import { Clase } from 'src/app/models/clase.model';
import { Router } from '@angular/router';
import { ChatRoom } from 'src/app/models/chatRoom.model';

@Component({
  selector: 'app-tab-alumnos-clase',
  templateUrl: './tab-alumnos-clase.page.html',
  styleUrls: ['./tab-alumnos-clase.page.scss'],
})
export class TabAlumnosClasePage implements OnInit {
  @Input() codigo: any;
  @Input() emailProfesor: any;
  @Input() nombreClase: any;
  @Input() nombreProfesor: any;



  alumnos: Alumno[] = [];

  constructor(
    private modalCtrl: ModalController,
    public alumnoService: AlumnoService,
    private toastCtrl: ToastController,
    private chatRoomService: ChatRoomService,
    public router: Router
  ) { }

  async ngOnInit() {
    console.log(this.codigo);

    await this.getAlumnosClase();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async getAlumnosClase() {
    this.alumnoService.getAlumnosByCodigo(this.codigo).then((res: any) => {
      this.alumnos = res.alumnos;
    });
  }

  async abrirChat(emailAlumno, nombreAlumno) {
    await this.comprobarChatRoomExistente(emailAlumno, nombreAlumno);
  }

  //Método para el alumno
  async comprobarChatRoomExistente(emailAlumno, nombreAlumno) {
    this.chatRoomService.getChatRoomsByEmails(emailAlumno, this.emailProfesor, this.codigo).then((res: any) => {
      console.log(res.data.length);
      if (res.data.length === 0) {
        this.crearChatRoom(emailAlumno, this.nombreClase, nombreAlumno);
      }
      else {
        this.toastChatRoomRepetido();
        this.router.navigate(['/tabs/chat']);
        this.modalCtrl.dismiss();
      }
    });
  }

  async crearChatRoom(emailAlumno, nombreClase, nombreAlumno) {
    //Se crea el chatRoom y se mapea:
    let chatRoom = new ChatRoom();
    chatRoom.clase = nombreClase;
    chatRoom.emailAlumno = emailAlumno;
    chatRoom.emailProfesor = this.emailProfesor;
    chatRoom.nombreAlumno = nombreAlumno;
    chatRoom.nombreProfesor = this.nombreProfesor;
    chatRoom.codigoClase = this.codigo;
    this.chatRoomService.crearChatRoom(chatRoom).then((res: any) => {
      if (res) {
        this.toastChatRoomCreado(emailAlumno);
        this.router.navigate(['/tabs/chat']);
        this.modalCtrl.dismiss();
      }
      else {
        this.toastChatRoomError();
      }
    });
  }

  eliminarAlumnoClase(emailAlumno) {
    this.alumnoService.eliminarCodigoClase(this.codigo, emailAlumno).then(res => {
      console.log(res);

      if (res) {
        this.toastAlumnoEliminadoConExito();
        this.modalCtrl.dismiss();
      }
      else {
        this.toastAlumnoErrorEliminar();
      }
    });
  }


  async toastChatRoomRepetido() {
    const toast = await this.toastCtrl.create({
      message: 'Ya tienes un chat abierto para este Alumno!',
      duration: 2000
    });
    toast.present();
  }

  async toastChatRoomCreado(emailAlumno) {
    const toast = await this.toastCtrl.create({
      message: 'Se ha creado un chat para el alumno' + emailAlumno + '!',
      duration: 2000
    });
    toast.present();
  }

  async toastChatRoomError() {
    const toast = await this.toastCtrl.create({
      message: 'Parece que el alumno ya no existe...',
      duration: 2000
    });
    toast.present();
  }

  async toastAlumnoEliminadoConExito() {
    const toast = await this.toastCtrl.create({
      message: 'Se ha Eliminado al alumno con exito!',
      duration: 2000
    });
    toast.present();
  }

  async toastAlumnoErrorEliminar() {
    const toast = await this.toastCtrl.create({
      message: 'Parece que este alumno ya no existe..',
      duration: 2000
    });
    toast.present();
  }
}
