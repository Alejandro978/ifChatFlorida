import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ModalController } from "@ionic/angular";
import { Nota } from 'src/app/models/nota.model';
import { AgendaService } from 'src/app/services/agenda-service';




@Component({
  selector: 'app-tab-nota-modal',
  templateUrl: './tab-nota-modal.page.html',
  styleUrls: ['./tab-nota-modal.component.scss'],
})
export class TabNotaModalComponent implements OnInit {

  nota: Nota = new Nota();
  @Input() email: any;


  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private notasService: AgendaService
  ) {

  }

  async ngOnInit() {



  }


  cerrar() {
    this.modalCtrl.dismiss(false);
  }

  crearNota() {
    console.log(this.nota);
    this.nota.email = this.email;
    this.notasService.crearNota(this.nota).then(res => {
      if (res) {
        this.toastSuccess();
        this.modalCtrl.dismiss(true);
      }
      else {
        this.toastUnsuccess();
      }
    })
  }



  
  async toastSuccess() {
    const toast = await this.toastCtrl.create({
      message: 'Nota creada con exito.',
      duration: 2000
    });

    toast.present();
  }

  async toastUnsuccess() {
    const toast = await this.toastCtrl.create({
      message: 'VAYA! La nota no se pudo crear!',
      duration: 2000
    });
    toast.present();

  }

}