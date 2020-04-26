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
    this.auth.login(this.loginUser.email, this.loginUser.password).then(res => {
      if (res) {

        this.navCtrl.navigateRoot('/tabs', { animated: true });
      }
      else {
        this.toastUnsuccess();

      }
    });

  }

  async toastUnsuccess() {
    const toast = await this.toastCtrl.create({
      message: 'Usuario / Contraseña incorrectos.',
      duration: 2000
    });

    toast.present();
  }

}
