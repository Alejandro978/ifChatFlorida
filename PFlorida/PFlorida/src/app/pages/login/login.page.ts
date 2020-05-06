import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    email: 'alumno@gmail.com',
    password: 'alumno'
  }
  email: string;
  password: string;

  constructor(private navCtrl: NavController, private auth: AuthService, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    if (!!this.loginUser && !!this.loginUser.password) {
      this.auth.login(this.loginUser.email, this.loginUser.password).then(res => {
        if (res) {

          this.navCtrl.navigateRoot('/tabs', { animated: true });
        }
        else {
          this.toastUnsuccess();

        }
      });
    }
    else {
      this.toastDatosNull();
    }
  }

  async toastUnsuccess() {
    const toast = await this.toastCtrl.create({
      message: 'Usuario / Contraseña incorrectos.',
      duration: 2000
    });

    toast.present();
  }

  async toastDatosNull() {
    const toast = await this.toastCtrl.create({
      message: 'Introduce un correo y una contraseña para entrar a la aplicación.',
      duration: 2000
    });

    toast.present();
  }

}
