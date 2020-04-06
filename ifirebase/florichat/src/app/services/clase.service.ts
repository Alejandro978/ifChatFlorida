import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Chat } from '../models/chat.model';
import { Mensaje } from '../models/mensaje.model';
import { firestore } from 'firebase';
import { Clase } from '../models/clase.model';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(private db: AngularFirestore, public toastCtrl: ToastController) { }


  //ROL PROFESOR
  getClasesProfesor() {
    //Se apunta a la coleccion con el nombre de firestore.
    return this.db.collection('clases').snapshotChanges().pipe(map(clases => {
      return clases.map(a => {
        console.log("Servicio");

        //A este servicio se le llama desde un subscribe, por lo tanto siempre que hay cambios duplica la información en pantalla....
        //Se mapea para no obtener datos repetidos.
        const data = a.payload.doc.data() as Clase;
        return data;
      })
    }));
  }

  async crearClase(clase: Clase) {
    let claseExistente = this.db.collection('clases').doc(clase.CodigoClase);

    if (claseExistente === undefined) {
      this.db.collection('clases').doc(clase.CodigoClase).set({
        IdProfesor: clase.IdProfesor,
        CodigoClase: clase.CodigoClase,
        Nombre: clase.Nombre,
        Descripcion: clase.Descripcion,
      }).catch(err => {
        console.log(err);
      });
    }
    else {
      const toast = await this.toastCtrl.create({
        message: 'Ya existe una clase con ese código.',
        duration: 2000
      });
      toast.present();
    }
  }

  //ROL ALUMNO
  getClasesAlumno() {

  }



}
