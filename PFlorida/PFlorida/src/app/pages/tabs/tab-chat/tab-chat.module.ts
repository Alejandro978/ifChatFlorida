import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabChatPage } from './tab-chat.page';
import { TabChatModalComponent } from './tab-chat-modal/tab-chat-modal.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  entryComponents: [TabChatModalComponent],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabChatPage
      }
    ])
  ],
  declarations: [TabChatPage, TabChatModalComponent]
})
export class TabChatPageModule { }
