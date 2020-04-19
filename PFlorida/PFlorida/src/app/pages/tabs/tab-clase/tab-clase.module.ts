import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabClasePage } from './tab-clase.page';
import { TabClaseModalComponent } from './tab-clase-modal/tab-clase-modal.component';


@NgModule({
  entryComponents: [TabClaseModalComponent],
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
  declarations: [TabClasePage, TabClaseModalComponent],
})
export class TabClasePageModule { }
