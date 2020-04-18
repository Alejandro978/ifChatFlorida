import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from "@ionic/angular";


@Component({
  selector: 'app-tab-clase-modal',
  templateUrl: './tab-clase-modal.page.html',
  styleUrls: ['./tab-clase-modal.component.scss'],
})
export class TabClaseModalComponent implements OnInit {

 
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
  ];

  avatarSlide = {
    slidesPerView: 3.5,
  }

  constructor(
   
  ) {
    
  }

  ngOnInit() {

   
  }

 

}