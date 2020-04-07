import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { ChatService } from "../../../services/chat.service";
import { Chat } from '../../../models/chat.model';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ChatModalComponent } from '../../../components/chat-modal/chat-modal.component';
import { Mensaje } from '../../../models/mensaje.model';
import { ClaseService } from '../../../services/clase.service';
import { Clase } from 'src/app/models/clase.model';
import { Storage } from '@ionic/storage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RolesEnum } from '../../../models/enums/rolesEnum';
import * as _ from 'lodash';
import { TabClaseModalComponent } from './tab-clase-modal/tab-clase-modal.component';

@Component({
  selector: 'app-tab-clase',
  templateUrl: 'tab-clase.page.html',
  styleUrls: ['tab-clase.page.scss'],
})
export class TabClasePage {

  clases: Clase[] = [];
  userInfo: any;
  rolesEnum: RolesEnum = new RolesEnum();
  constructor(
    private storage: Storage,
    private claseService: ClaseService,
    private modalCtrl: ModalController
  ) {
    this.getInfoUsuario();
  }


  async ionViewWillEnter() {

    await this.getClasesByRol();


  }

  async getClasesByRol() {
    if (this.userInfo !== null) {

      switch (this.userInfo.idRol) {
        case this.rolesEnum.rolProfesor:
          await this.getClasesProfesor();
          break;

        case this.rolesEnum.rolAlumno:
          console.log("Alumno");
          break;

        default:
          break;
      }
    }

  }

  filtrarClasesProfesor(listadoClases) {
    //Se vacia para que no vengan clases duplicadas
    this.clases = [];
    listadoClases.forEach(clase => {
      if (clase.IdProfesor === this.userInfo.idProfesor) {
        this.clases.push(clase);
      }

    });
  }

  getInfoUsuario() {
    this.storage.get('userInfo').then(res => {
      this.userInfo = res;
    });
  }

  async getClasesProfesor() {

    this.claseService.getClasesProfesor().subscribe(listadoClases => {
      //Filtramos las clases con lodash ya que con los servicios de Firebase da muchos problemas:
      if (!!listadoClases) {
        this.filtrarClasesProfesor(listadoClases)
      }
    });
  }

  crearClase() {
    this.modalCtrl.create({
      component: TabClaseModalComponent,
      componentProps: {
        idRol: this.userInfo.idRol,
        idProfesor: this.userInfo.idProfesor
      }
    }).then((modal) => {
      modal.present();
    })
  }

}