import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ModalController, AlertController } from "@ionic/angular";
import { Clase } from '../../../../models/clase.model';
import { ClaseService } from '../../../../services/clase.service';
import { Storage } from '@ionic/storage';
import { RolesEnum } from '../../../../models/enums/rolesEnum';




@Component({
  selector: 'app-tab-clase-modal',
  templateUrl: './tab-clase-modal.page.html',
  styleUrls: ['./tab-clase-modal.component.scss'],
})
export class TabClaseModalComponent implements OnInit {
  @Input() userInfo: any;
  @Input() idRol: any;
  clase: Clase = new Clase();
  claseFiltrada: Clase = null;
  codigoClase: string;
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


  clases: Clase[] = [];

  rolesEnum: RolesEnum = new RolesEnum();

  constructor(
    private claseService: ClaseService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {

  }

  async ngOnInit() {
    console.log(this.idRol);

    // if (this.idRol === this.rolesEnum.rolProfesor) {

    this.seleccionarAvatar(this.avatars[0]);

    // }

  }
  crearClase() {
    this.clase.email = this.userInfo.email;
    this.claseService.crearClase(this.clase).then(res => {
      if (res) {
        this.toastSuccess();
        this.modalCtrl.dismiss(true);
      }
      else {
        this.toastUnsuccess();

      }
    })
  }



  seleccionarAvatar(avatar) {
    //Se desseleccionan todos los Avatares para seleccionar al que se hizo click
    this.avatars.forEach(av => av.seleccionado = false);
    //De esta manera se modificará al avatar que está apuntando en el array
    avatar.seleccionado = true;

    this.clase.avatar = avatar.img;
  }


  async toastSuccess() {
    const toast = await this.toastCtrl.create({
      message: 'Clase creada con existo.',
      duration: 2000
    });

    toast.present();
  }

  async toastUnsuccess() {
    const toast = await this.toastCtrl.create({
      message: 'VAYA! Este Código clase ya está siendo utilizado, introduzca otro!.',
      duration: 2000
    });
    toast.present();

  }

  cerrar() {
    this.modalCtrl.dismiss(false);
  }

  async consultarAsignacionClaseAlumno() {
    this.claseService.getClasesByCodigoClase(this.codigoClase).then((res: any) => {

      if (res.data) {
        this.claseFiltrada = res.data;
        console.log(this.claseFiltrada);
      }
      else {
        console.log("asdasd");
      }
    });
  }

}