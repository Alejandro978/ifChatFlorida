import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // usuario: { email: string, contrasenya: string }

  email: string = 'profesor@gmail.com';
  contrasenya: string = 'profesor';
  constructor(private db: AngularFirestore, private storage: Storage, private auth: AuthService, public router: Router, public toastCtrl: ToastController) { }

  ngOnInit() {

  }

  async onSubmitLogin() {
    this.auth.login(this.email, this.contrasenya).then((res: any) => {
      this.setUser(res.user.uid);
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

  async setUser(uid) {
    this.getProfesor(uid).subscribe(userInfo => {
      //Si no existe en la tabla de profesores
      if (!!userInfo) {
        this.storage.set('userInfo', userInfo);
        this.router.navigate(['/tabs']);
      }
      else {
        this.getAlumno(uid).subscribe(userInfo => {
          this.storage.set('userInfo', userInfo);
          this.router.navigate(['/tabs']);
        });
      }
    });
  }

  getProfesor(uid: string) {
    return this.db.collection('profesores').doc(uid).valueChanges();
  }

  getAlumno(uid: string) {
    return this.db.collection('alumnos').doc(uid).valueChanges();
  }
}
