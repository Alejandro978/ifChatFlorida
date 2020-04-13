import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Profesor } from '../models/profesor.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Alumno } from '../models/alumno.model';
import { RolesEnum } from '../models/enums/rolesEnum';
import { Storage } from '@ionic/storage';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rolesEnum: RolesEnum = new RolesEnum();

  constructor(
    private storage: Storage,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
  ) {
  }

  login(email: string, contrasenya: string) {

    return new Promise((resolve, rejected) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, contrasenya).then(user => {
        resolve(user);

      }).catch(err => rejected(err));

    });
  }

  logout() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }

  // registrarProfesor(profesor: Profesor) {
  //   return new Promise(resolve => {
  //     this.http.post()
  //   });

  }

//   registrarAlumno(alumno: Alumno) {

//     return new Promise((resolve, reject) => {

//       this.angularFireAuth.auth.createUserWithEmailAndPassword(alumno.Email, alumno.Contrasenya).then(res => {

//         this.db.collection('alumnos').doc(res.user.uid).set({
//           nombre: alumno.Nombre,
//           email: alumno.Email,
//           idRol: this.rolesEnum.rolAlumno,
//           idAlumno: res.user.uid
//         });
//         resolve(res);
//       }).catch(err => reject(err));
//     });

//   }
// }
