import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: { email: string, contrasenya: string }

  constructor(private auth: AuthService, public router: Router, public toastCtrl: ToastController) { }

  ngOnInit() {

  }

  onSubmitLogin() {
    this.auth.login(this.usuario.email, this.usuario.contrasenya).then(res => {
      this.router.navigate(['/home']);
    }).catch(err => {
      this.ejecutarToast();
    });
  }

  async ejecutarToast() {
    const toast = await this.toastCtrl.create({
      message: 'Datos incorrectos.',
      duration: 2000
    });
    toast.present();
  }
}
