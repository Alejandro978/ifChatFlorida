import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController, NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    email: '',
    password: ''
  }
  email: string;
  password: string;
  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private auth: AuthService, private toastCtrl: ToastController, private uiService: UiServiceService) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  onSubmitLogin() {
    if (!!this.loginUser && !!this.loginUser.password) {
      this.auth.login(this.loginUser.email, this.loginUser.password).then((res: any) => {
        if (res) {
          this.navCtrl.navigateRoot('/tabs', { animated: true });
        }
        else {
          this.uiService.presentAlert('Usuario o contraseña incorrectos');
        }
      });
    }
    else {
      this.toastDatosNull();
    }
  }

  async toastDatosNull() {
    const toast = await this.toastCtrl.create({
      message: 'Introduce un correo y una contraseña para entrar a la aplicación.',
      duration: 2000
    });

    toast.present();
  }

}
