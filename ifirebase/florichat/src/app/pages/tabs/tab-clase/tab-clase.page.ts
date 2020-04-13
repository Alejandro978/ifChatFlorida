import { Component,OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClaseService } from '../../../services/clase.service';
import { Clase } from 'src/app/models/clase.model';
import { Storage } from '@ionic/storage';
import { RolesEnum } from '../../../models/enums/rolesEnum';
import * as _ from 'lodash';
import { TabClaseModalComponent } from './tab-clase-modal/tab-clase-modal.component';

@Component({
  selector: 'app-tab-clase',
  templateUrl: 'tab-clase.page.html',
  styleUrls: ['tab-clase.page.scss'],
})
export class TabClasePage  implements OnInit {

  clases: Clase[] = [];
  userInfo: any;
  rolesEnum: RolesEnum = new RolesEnum();
  prueba:any;
  constructor(
    public storage: Storage,
    private claseService: ClaseService,
    private modalCtrl: ModalController
  ) {
  }
  async ngOnInit() {
   
  }

  async ionViewWillEnter() {

    await this.getUserInfo();
    await this.getClasesByRol();
    
    
  }
  async getUserInfo() {

    let e =  await this.storage.get('userInfo');

    this.storage.get('userInfo').then(res => {
      this.userInfo = res;
    });
  }
  async getClasesByRol() {
    if (this.userInfo !== null) {

      switch (this.userInfo.idRol) {
        case this.rolesEnum.rolProfesor:
          await this.getClasesProfesor();
          break;

        case this.rolesEnum.rolAlumno:
          await this.getClasesAlumno();
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
      if (!!clase) {
        if (clase.IdProfesor === this.userInfo.idProfesor) {
          this.clases.push(clase);
        }
      }
    });
  }
  filtrarClasesAlumno(listadoClases) {
    //Se vacia para que no vengan clases duplicadas
    this.clases = [];
    listadoClases.forEach((clase: Clase) => {
      clase.alumnos.forEach(alumno => {
        if (alumno.idAlumno === this.userInfo.idAlumno)
          this.clases.push(clase);
      });
    });
  }



  async getClasesProfesor() {
    this.claseService.getClasesProfesor().subscribe(listadoClases => {
      if (!!listadoClases) {
        this.filtrarClasesProfesor(listadoClases)
      }
    });
  }

  async getClasesAlumno() {
    this.claseService.getClasesAlumno().subscribe(listadoClases => {
      if (!!listadoClases) {
        this.filtrarClasesAlumno(listadoClases)
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

    this.modalCtrl.dismiss().then(e => {
      console.log(e);
    })
  }

  borrarClase(clase) {
    let IdClase = clase.IdClase;
    this.claseService.eliminarClase(IdClase, this.userInfo);
  }

}