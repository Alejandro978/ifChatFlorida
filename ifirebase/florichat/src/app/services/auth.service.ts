import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';

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

  register(usuario: Usuario) {

    return new Promise((resolve, reject) => {

      this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password).then(res => {

        this.db.collection('users').doc(res.user.uid).set({
          nombre: usuario.nombre,
          email:usuario.email,
          uid:res.user.uid
        })

        console.log(res.user.uid);
        resolve(res);
      }).catch(err => reject(err));
    });

  }
}
