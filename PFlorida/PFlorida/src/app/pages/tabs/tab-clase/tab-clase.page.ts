import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import * as _ from 'lodash';
import { TabClaseModalComponent } from './tab-clase-modal/tab-clase-modal.component';
import { ClaseService } from 'src/app/services/clase.service';
import { Storage } from '@ionic/storage';
import { RolesEnum } from '../../../models/enums/rolesEnum';
import { Clase } from '../../../models/clase.model';

@Component({
  selector: 'app-tab-clase',
  templateUrl: 'tab-clase.page.html',
  styleUrls: ['tab-clase.page.scss'],
})
export class TabClasePage implements OnInit {

  idRol: number;
  userInfo: any;
  rolesEnum: RolesEnum = new RolesEnum();
  clases: Clase[] = [];
  constructor(
    private modalCtrl: ModalController,
    private claseService: ClaseService,
    private storage: Storage
  ) {
  }
  async ngOnInit() {
    await this.getUserInfo();
    console.log(this.idRol);

    if (this.idRol === this.rolesEnum.rolProfesor) {
      await this.getClasesProfesor();
    }

  }

  async getClasesProfesor() {
    this.claseService.getClasesByEmail(this.userInfo.email).then((res: any) => {
      if (res.data) {
        this.clases = res.data;
        console.log(this.clases);

      }
    });
  }


  crearClase() {
    this.modalCtrl.create({
      component: TabClaseModalComponent,
      componentProps: {
        userInfo: this.userInfo,
        idRol: this.idRol,
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

  async getUserInfo() {
    this.userInfo = await this.storage.get('user');
    this.idRol = await this.storage.get('idRol');
    this.idRol = +this.idRol;
    console.log(this.idRol);

  }

}