import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';
import { IonSlides } from '@ionic/angular';
import { Alumno } from 'src/app/models/alumno.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  @ViewChild('slideGeneral', { static: false }) slides: IonSlides;

  titulo: string = "Registrar profesor";

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
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  profesor: Profesor = new Profesor();
  alumno: Alumno = new Alumno();

  avatarSlideGeneral = {
    allowTouchMove: false
  }
  avatarSlide = {
    slidesPerView: 3.5,
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    //Cancelamos el movimiento del slide
    // this.slides.lockSwipes(true);

  }


  crearProfesor() {
    this.authService.registrarProfesor(this.profesor).then(auth => {
      this.router.navigate(['tabs']);

    }).catch(err => console.log(err));
  }

  crearAlumno() {
    this.authService.registrarAlumno(this.alumno).then(auth => {
      this.router.navigate(['tabs']);

    }).catch(err => console.log(err));
  }

  seleccionarAvatar(avatar) {
    //Se desseleccionan todos los Avatares para seleccionar al que se hizo click
    this.avatars.forEach(av => av.seleccionado = false);
    //De esta manera se modificará al avatar que está apuntando en el array
    avatar.seleccionado = true;
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
