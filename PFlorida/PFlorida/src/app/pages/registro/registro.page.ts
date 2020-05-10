import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ToastController, NavController } from '@ionic/angular';
import { Profesor } from '../../models/profesor.model';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from "../../services/alumno-services.service";
import { ProfesorService } from "../../services/profesor-services.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  @ViewChild('slideGeneral', { static: false }) slides: IonSlides;

  titulo: string = "Registrar profesor";

  formProfesor: FormGroup;
  formAlumno: FormGroup;

  profesor: Profesor = new Profesor();
  alumno: Alumno = new Alumno();

  avatarSlideGeneral = {
    allowTouchMove: false
  }

  avatarSelected: string;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private router: Router, private toastCtrl: ToastController, private alumnoService: AlumnoService, private profesorService: ProfesorService) {

  }

  ngOnInit() {
    this.formProfesor = this.formBuilder.group({
      emailProfesor: ['', [Validators.required, Validators.email]],
      passwordProfesor: ['', Validators.required],
      nombreProfesor: ['', Validators.required]
    });

    this.formAlumno = this.formBuilder.group({
      emailAlumno: ['', [Validators.required, Validators.email]],
      passwordAlumno: ['', Validators.required],
      nombreAlumno: ['', Validators.required]
    });
    //Cancelamos el movimiento del slide
    // this.slides.lockSwipes(true);

  }


  crearProfesor() {
    this.profesor.idRol = 1;
    this.profesor.avatar = this.avatarSelected;
    console.log(this.profesor);

    this.profesorService.crearProfesor(this.profesor).then(res => {
      if (res) {
        this.toastSuccess();
        this.navCtrl.navigateRoot('/login', { animated: true });

      }
      else {
        this.toastUnsuccess();
      }
    });
  }

  crearAlumno() {
    console.log("Crear alumno");

    this.alumno.idRol = 2;
    this.alumno.avatar = this.avatarSelected;
    console.log(this.alumno);

    this.alumnoService.crearAlumno(this.alumno).then(res => {
      if (res) {
        this.toastSuccess();
        this.navCtrl.navigateRoot('/login', { animated: true });
      }
      else {
        this.toastUnsuccess();
      }
    });
  }

  async toastSuccess() {
    const toast = await this.toastCtrl.create({
      message: 'Usuario creado con exito.',
      duration: 2000
    });

    toast.present();
  }

  async toastUnsuccess() {
    const toast = await this.toastCtrl.create({
      message: 'Ya existe un usuario con este correo.',
      duration: 2000
    });
    toast.present();

  }

  volverLogin() {
    this.router.navigate(['login']);
  }

  registroAlumno() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
    this.titulo = 'Registrar profesor';
  }

  registroProfesor() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
    this.titulo = 'Registrar alumno'
  }

  getTitulo() {
    return 'Prueba';
  }
}
