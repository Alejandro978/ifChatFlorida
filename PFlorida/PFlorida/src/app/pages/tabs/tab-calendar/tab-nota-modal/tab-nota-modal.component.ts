import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ModalController } from "@ionic/angular";
import { Nota } from 'src/app/models/nota.model';
import { AgendaService } from 'src/app/services/agenda-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';




@Component({
  selector: 'app-tab-nota-modal',
  templateUrl: './tab-nota-modal.page.html',
  styleUrls: ['./tab-nota-modal.component.scss'],
})
export class TabNotaModalComponent implements OnInit {

  nota: Nota = new Nota();
  @Input() email: any;
  formNota: FormGroup;


  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private notasService: AgendaService,
    private formBuilder: FormBuilder

  ) {

  }

  async ngOnInit() {
    this.formNota = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });


  }


  cerrar() {
    this.modalCtrl.dismiss(false);
  }

  crearNota() {
    this.nota.email = this.email;
    console.log(this.nota.fecha);

    if (this.nota.fecha !== undefined) {
      this.notasService.crearNota(this.nota).then(res => {
        if (res) {
          this.toastSuccess();
          this.modalCtrl.dismiss(true);
        }
        else {
          this.toastUnsuccess();
        }
      });
    }
    else {
      this.toastFecha();
    }
  }

  async toastFecha() {
    const toast = await this.toastCtrl.create({
      message: 'Fecha obligatoria.',
      duration: 2000
    });

    toast.present();
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