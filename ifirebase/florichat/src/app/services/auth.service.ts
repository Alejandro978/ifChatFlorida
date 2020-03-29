import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Profesor } from '../models/profesor.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
  }

  login(email: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);

      }).catch(err => rejected(err));

    });
  }

  logout() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  registrarProfesor(profesor: Profesor) {

    return new Promise((resolve, reject) => {

      this.angularFireAuth.auth.createUserWithEmailAndPassword(profesor.email, profesor.contrasenya).then(res => {

        this.db.collection('profesores').doc(res.user.uid).set({
          nombre: profesor.nombre,
          email:profesor.email,
          uid:res.user.uid
        })

        console.log(res.user.uid);
        resolve(res);
      }).catch(err => reject(err));
    });

  }

  registrarAlumno(alumno: Alumno) {

    return new Promise((resolve, reject) => {

      this.angularFireAuth.auth.createUserWithEmailAndPassword(alumno.email, alumno.contrasenya).then(res => {

        this.db.collection('alumnos').doc(res.user.uid).set({
          nombre: alumno.nombre,
          email:alumno.email,
          uid:res.user.uid
        })

        console.log(res.user.uid);
        resolve(res);
      }).catch(err => reject(err));
    });

  }
}
