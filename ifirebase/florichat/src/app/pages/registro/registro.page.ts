import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

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
  alumno: Profesor = new Profesor();


  avatarSlide = {
    slidesPerView: 3.5
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.usuario).then(auth => {
      this.router.navigate(['home']);
      console.log(auth);

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
}
