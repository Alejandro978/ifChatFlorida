import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabCalendarPage } from './tab-calendar.page';
import { TabNotaModalComponent } from './tab-nota-modal/tab-nota-modal.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  entryComponents: [TabNotaModalComponent],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
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
