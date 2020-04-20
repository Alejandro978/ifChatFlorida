import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';

import * as _ from 'lodash';
import { TabClaseModalComponent } from './tab-clase-modal/tab-clase-modal.component';
import { ClaseService } from 'src/app/services/clase.service';
import { Storage } from '@ionic/storage';
import { RolesEnum } from '../../../models/enums/rolesEnum';
import { Clase } from '../../../models/clase.model';
import { AlumnoService } from 'src/app/services/alumno-services.service';

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
  codigoClase: string;
  constructor(
    private modalCtrl: ModalController,
    private claseService: ClaseService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private alumnoService: AlumnoService
  ) {
  }
  async ngOnInit() {
    await this.getUserInfo();

    if (this.idRol === this.rolesEnum.rolProfesor) {
      await this.getClasesProfesor();
    }
    else {
      await this.getClasesAlumno();
    }

  }

  async getClasesProfesor() {
    this.claseService.getClasesByEmail(this.userInfo.email).then((res: any) => {
      if (res.data) {
        this.clases = res.data;

      }
    });
  }

  async getClasesAlumno() {
    this.claseService.getClasesByCodigoClase(this.codigoClase).then((res: any) => {
      if (res.data) {
        this.clases = res.data;

      }
    });
  }


  async crearClase() {

    if (this.idRol === this.rolesEnum.rolProfesor) {
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
    console.log(codigo);

    this.claseService.getClasesByCodigoClase(codigo).then((res: any) => {
      if (res.data) {
        this.agregarClaseAlumno(codigo);
      }
      else {
        this.toastCodigoInvalido();
      }
    });
  }

  agregarClaseAlumno(codigo) {
    this.alumnoService.agregarClaseAlumnoService(codigo, this.userInfo.email).then(res => {
      if (res) {
        this.toastRegistradoConExito();
      }
      else {
        this.toastClaseRepetida();
      }
    });
  }

  async getUserInfo() {
    this.userInfo = await this.storage.get('user');
    this.idRol = await this.storage.get('idRol');
    this.idRol = +this.idRol;
  }

  async toastCodigoInvalido() {
    const toast = await this.toastCtrl.create({
      message: 'VAYA! Este Código clase no existe, introduzca otro!',
      duration: 2000
    });
    toast.present();
  }

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


}