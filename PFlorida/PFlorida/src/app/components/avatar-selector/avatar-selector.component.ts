import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSelected = new EventEmitter();

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5,
  }

  constructor() { }

  ngOnInit() {
    this.seleccionarAvatar(this.avatars[0]);
   }

  seleccionarAvatar(avatar) {
    //Se desseleccionan todos los Avatares para seleccionar al que se hizo click
    this.avatars.forEach(av => av.seleccionado = false);
    //De esta manera se modificará al avatar que está apuntando en el array
    avatar.seleccionado = true;
    //Se emite el "string" del avatar seleccionado
    this.avatarSelected.emit(avatar.img);
  }

}


