import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map, take } from 'rxjs/operators';
import { Chat } from '../models/chat.model';
import { Mensaje } from '../models/mensaje.model';
import { firestore } from 'firebase';
import { Clase } from '../models/clase.model';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseFirestore, FirebaseStorage, FirebaseDatabase } from '@angular/fire';
import { Firebase } from '@ionic-native/firebase/ngx';
@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  flagCrearClase = true;
  constructor(private db: AngularFirestore, public toastCtrl: ToastController, ) { }


  //ROL PROFESOR
  getClasesProfesor() {
    //Se apunta a la coleccion con el nombre de firestore.
    return this.db.collection('clases').snapshotChanges().pipe(map(clases => {
      return clases.map(a => {
        //A este servicio se le llama desde un subscribe, por lo tanto siempre que hay cambios duplica la información en pantalla....
        //Se mapea para no obtener datos repetidos.
        const data = a.payload.doc.data() as Clase;
        return data;
      })
    }));
  }


  //ROL ALUMNO
  getClasesAlumno() {
    return this.db.collection('clases').snapshotChanges().pipe(map(clases => {
      return clases.map(a => {
        //A este servicio se le llama desde un subscribe, por lo tanto siempre que hay cambios duplica la información en pantalla....
        //Se mapea para no obtener datos repetidos.
        const data = a.payload.doc.data() as Clase;
        return data;
      })
    }));
  }

  //Genéricos

  crearClase(clase) {
    //TODO:Comprobar si ya existe el código clase que se intenta introducir
    this.db.collection('clases').doc(clase.CodigoClase).set({
      IdProfesor: clase.IdProfesor,
      CodigoClase: clase.CodigoClase,
      Nombre: clase.Nombre,
      Descripcion: clase.Descripcion,
    }).catch(err => {
      console.log(err);
    });
  }


  async toastCreadoCorrectamente() {
    const toast = await this.toastCtrl.create({
      message: 'Clase creada correctamente',
      duration: 2000
    });
    toast.present();
  }

  async toastCodigoUsado() {
    const toast = await this.toastCtrl.create({
      message: 'Código Clase en uso',
      duration: 2000
    });
    toast.present();
  }

}
