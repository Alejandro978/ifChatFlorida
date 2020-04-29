import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabClasePage } from './tab-clase.page';
import { TabClaseModalComponent } from './tab-clase-modal/tab-clase-modal.component';
import { TabAlumnosClasePage } from './tab-alumnos-clase/tab-alumnos-clase.page';


@NgModule({
  entryComponents: [TabClaseModalComponent, TabAlumnosClasePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabClasePage
      }
    ])
  ],
  declarations: [TabClasePage, TabClaseModalComponent, TabAlumnosClasePage],
})
export class TabClasePageModule { }
