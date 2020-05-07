import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [AvatarSelectorComponent,HeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    AvatarSelectorComponent,HeaderComponent
  ]
})
export class ComponentsModule { }
