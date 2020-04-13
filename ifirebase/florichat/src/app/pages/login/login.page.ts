import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // usuario: { email: string, contrasenya: string }

  email: string = 'alumno@gmail.com';
  contrasenya: string = '123456';
  constructor(public router: Router, public toastCtrl: ToastController) { }

  ngOnInit() {

  }

  
}
