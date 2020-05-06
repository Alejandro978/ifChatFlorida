import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(
    private storage: Storage,
    private modalCtrl: ModalController,
    private agendaService: AgendaService) {

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
    console.log("nota creada");
    this.agendaService.getNotasByEmail(this.userInfo[0].user.email).then((res: any) => {
      this.notas = res.data;
      console.log(this.notas);
    });

  }

  async getUserInfo() {
    this.userInfo = await this.storage.get('userInfo');
  }

  getDate(date) {
    let fechaDevolver = new Date(date);
    // console.log(prueba.getDate());
    // return '';
    return fechaDevolver.getDate() + "/" + fechaDevolver.getMonth() + "/" + fechaDevolver.getFullYear();

  }

}




