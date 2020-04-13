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
import { Alumno } from '../models/alumno.model';
import { Profesor } from '../models/profesor.model';
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
        data.IdClase = a.payload.doc.id;
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
        data.IdClase = a.payload.doc.id;
        return data;
      })
    }));
  }

  async añadirAlumnoClase(alumno: Alumno, clase_id: string) {
    alumno.clases = null;
    this.db.collection('clases').doc(clase_id).update({
      alumnos: firestore.FieldValue.arrayUnion(alumno),
    });
    this.db.collection('alumnos').doc(alumno.idAlumno).update({
      clases: firestore.FieldValue.arrayUnion(clase_id),
    });

    const toast = await this.toastCtrl.create({
      message: 'Se ha registrado correctamente.',
      duration: 2000
    });

    toast.present();

  }

  //Genéricos
  crearClase(clase, profesor: any) {
    console.log(profesor);
    
    let nombreProfesor = profesor.nombre;
    let cClase = clase.CodigoClase
    //TODO:Comprobar si ya existe el código clase que se intenta introducir
    this.db.collection('clases').doc(cClase).set({
      IdProfesor: clase.IdProfesor,
      CodigoClase: clase.CodigoClase,
      Nombre: clase.Nombre,
      NombreProfesor: nombreProfesor
    }).catch(err => {
      console.log(err);
    });
  }




  eliminarClase(IdClase, alumno: Alumno) {

    // this.db.collection('clases').doc(IdClase).delete().then(res => {
    //   console.log(res);
    // });


  }
}
