import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabCalendarPage } from './tab-calendar.page';
import { TabNotaModalComponent } from './tab-nota-modal/tab-nota-modal.component';


@NgModule({
  entryComponents: [TabNotaModalComponent],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabCalendarPage
      }
    ])
  ],
  declarations: [TabCalendarPage, TabNotaModalComponent]
})
export class TabCalendarPageModule { }
