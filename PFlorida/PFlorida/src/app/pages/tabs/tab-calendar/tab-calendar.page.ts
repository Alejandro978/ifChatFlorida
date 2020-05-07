import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TabNotaModalComponent } from './tab-nota-modal/tab-nota-modal.component';
import { AgendaService } from 'src/app/services/agenda-service';
import { Nota } from 'src/app/models/nota.model';


@Component({
  selector: 'app-tab-calendar',
  templateUrl: 'tab-calendar.page.html',
  styleUrls: ['tab-calendar.page.scss'],
})
export class TabCalendarPage {
  userInfo: any;
  notas: Nota[] = [];
  titulo: string = "Agenda";
  avatar:string;
  constructor(
    private storage: Storage,
    private modalCtrl: ModalController,
    private agendaService: AgendaService,
    private toastCtrl: ToastController,
    ) {

  }

  async ionViewWillEnter() {
    await this.getUserInfo();
    await this.getNotasByeMail();

  }




  async crearNota() {

    this.modalCtrl.create({
      component: TabNotaModalComponent,
      componentProps: {
        email: this.userInfo[0].user.email
      }
    }).then((modal) => {
      modal.present();

      modal.onDidDismiss().then(created => {
        if (created) {
          this.getNotasByeMail();
        }
      });

    });

  }


  getNotasByeMail() {
    this.agendaService.getNotasByEmail(this.userInfo[0].user.email).then((res: any) => {
      this.notas = res.data;
      console.log(this.notas);
    });

  }

  async getUserInfo() {
    this.userInfo = await this.storage.get('userInfo');
    this.avatar = this.userInfo[0].avatar;
  }

  getDate(date) {
    let fechaDevolver = new Date(date);
    // console.log(prueba.getDate());
    // return '';
    return fechaDevolver.getDate() + "/" + fechaDevolver.getMonth() + "/" + fechaDevolver.getFullYear();

  }


  eliminarNotas(_id: string) {
    
    this.agendaService.deleteNotaById(_id).then(res => {
      console.log(res);
      if (res) {
        this.toastNotaEliminada();
        this.getNotasByeMail();
      }
      else {
        this.toastNotaNoEliminada();
      }
    });
  }

  async toastNotaEliminada() {
    const toast = await this.toastCtrl.create({
      message: 'Nota elimianda con exito',
      duration: 2000
    });
    toast.present();
  }

  async toastNotaNoEliminada() {
    const toast = await this.toastCtrl.create({
      message: 'Hubo un problema al intentar eliminar la nota',
      duration: 2000
    });
    toast.present();
  }
}




