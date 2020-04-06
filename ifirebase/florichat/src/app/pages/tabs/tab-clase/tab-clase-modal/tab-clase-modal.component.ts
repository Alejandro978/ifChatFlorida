import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from "@ionic/angular";
import { Clase } from 'src/app/models/clase.model';
import { ClaseService } from 'src/app/services/clase.service';

@Component({
  selector: 'app-tab-clase-modal',
  templateUrl: './tab-clase-modal.page.html',
  styleUrls: ['./tab-clase-modal.component.scss'],
})
export class TabClaseModalComponent implements OnInit {

  IdProfesor: number;
  clase: Clase = new Clase();

  constructor(private modalCtrl: ModalController,
    private claseService: ClaseService, private navParams: NavParams) { }

  ngOnInit() {
    this.IdProfesor = this.navParams.get('idProfesor');
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  crearClase() {
    //Se mapea el IdProfesor que lo traemos desde la página padre por NavParams
    this.clase.IdProfesor = this.IdProfesor;
    this.claseService.crearClase(this.clase);
  }
}