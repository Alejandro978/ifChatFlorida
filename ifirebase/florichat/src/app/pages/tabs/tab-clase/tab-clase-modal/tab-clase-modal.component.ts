import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from "@ionic/angular";
import { Clase } from 'src/app/models/clase.model';
import { ClaseService } from 'src/app/services/clase.service';
import { RolesEnum } from 'src/app/models/enums/rolesEnum';

@Component({
  selector: 'app-tab-clase-modal',
  templateUrl: './tab-clase-modal.page.html',
  styleUrls: ['./tab-clase-modal.component.scss'],
})
export class TabClaseModalComponent implements OnInit {

  IdProfesor: number;
  IdRol: number;
  rolesEnum: RolesEnum = new RolesEnum();
  clase: Clase = new Clase();
  titulo: string;
  codigoFiltrado: string;
  clasesFiltradas: Clase[] = [];

  constructor(private modalCtrl: ModalController,
    private claseService: ClaseService, private navParams: NavParams) {
    this.IdProfesor = this.navParams.get('idProfesor');
    this.IdRol = this.navParams.get('idRol');

  }

  ngOnInit() {
    console.log(this.IdRol);
    if (this.IdRol === this.rolesEnum.rolAlumno) {
      this.titulo = "Unirme a una Clase"
    }
    else {
      this.titulo = "Añadir nueva Clase"

    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  crearClase() {
    this.clase.IdProfesor = this.IdProfesor;
    this.claseService.crearClase(this.clase);
  }

  consultarClases() {
    this.claseService.getClasesAlumno().subscribe(listadoClases => {
      if (!!listadoClases) {
        this.filtrarClasesByCodigo(listadoClases);
      }
    })
  }

  filtrarClasesByCodigo(listadoClases) {
    this.clasesFiltradas = [];

    listadoClases.forEach((clase: Clase) => {
      this.clasesFiltradas.push(clase);
      if (!!this.codigoFiltrado) {
        if (clase.CodigoClase === this.codigoFiltrado) {
          this.clasesFiltradas.push(clase);
        }
      }
    });

  }

}