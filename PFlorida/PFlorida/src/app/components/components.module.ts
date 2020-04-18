import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AvatarSelectorComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    AvatarSelectorComponent
  ]
})
export class ComponentsModule { }
