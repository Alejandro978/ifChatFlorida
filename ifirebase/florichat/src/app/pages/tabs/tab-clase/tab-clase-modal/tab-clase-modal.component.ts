import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from "@ionic/angular";
import { Clase } from 'src/app/models/clase.model';
import { ClaseService } from 'src/app/services/clase.service';
import { RolesEnum } from 'src/app/models/enums/rolesEnum';
import { Storage } from '@ionic/storage';

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
  userInfo: any;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5,
  }

  constructor(private modalCtrl: ModalController,
    private claseService: ClaseService,
    private navParams: NavParams,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.IdProfesor = this.navParams.get('idProfesor');
    this.IdRol = this.navParams.get('idRol');
    this.getInfoUsuario();
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

  seleccionarAvatar(avatar) {
    //Se desseleccionan todos los Avatares para seleccionar al que se hizo click
    this.avatars.forEach(av => av.seleccionado = false);
    //De esta manera se modificará al avatar que está apuntando en el array
    avatar.seleccionado = true;
  }

  getInfoUsuario() {
    this.storage.get('userInfo').then(res => {
      this.userInfo = res;
    });
  }
  cerrar() {
    this.modalCtrl.dismiss(
      {
        'dismissed': true
      }
    );
  }

  crearClase() {
    this.clase.IdProfesor = this.IdProfesor;
    this.claseService.crearClase(this.clase, this.userInfo);
    this.cerrar();
  }

  consultarClases() {
    this.claseService.getClasesAlumno().subscribe(listadoClases => {
      this.filtrarClasesByCodigo(listadoClases);
    })
  }

  async filtrarClasesByCodigo(listadoClases) {
    this.clasesFiltradas = [];
    console.log(this.clasesFiltradas.length);
    listadoClases.forEach((clase: Clase) => {
      if (!!this.codigoFiltrado) {
        if (clase.CodigoClase === this.codigoFiltrado) {
          this.clasesFiltradas.push(clase);
        }
      }
    });

    if (this.clasesFiltradas.length <= 0) {
      const toast = await this.toastCtrl.create({
        message: 'No existen Clases para el Código introducido.',
        duration: 2000
      });
      toast.present();
    }
  }

  async  registrarUsuarioClase(clase) {
    await this.claseService.añadirAlumnoClase(this.userInfo, clase.IdClase);
    this.cerrar();
  }

}