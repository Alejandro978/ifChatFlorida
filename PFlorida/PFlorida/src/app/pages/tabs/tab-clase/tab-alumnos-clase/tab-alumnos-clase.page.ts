import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno-services.service';
import { Alumno } from 'src/app/models/alumno.model';

@Component({
  selector: 'app-tab-alumnos-clase',
  templateUrl: './tab-alumnos-clase.page.html',
  styleUrls: ['./tab-alumnos-clase.page.scss'],
})
export class TabAlumnosClasePage implements OnInit {
  @Input() codigo: any;
  alumnos: Alumno[] = [];
  constructor(private modalCtrl: ModalController, public alumnoService: AlumnoService) { }

  async ngOnInit() {
    await this.getAlumnosClase();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async getAlumnosClase() {
    this.alumnoService.getAlumnosByCodigo(this.codigo).then((res: any) => {
      this.alumnos = res.alumnos;
    });
    console.log(this.alumnos);
    
  }


}
