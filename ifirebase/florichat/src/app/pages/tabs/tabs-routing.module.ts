import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:
      [
        {
          path: 'chat',
          loadChildren: () => import('../tabs/tab-chat/tab-chat.module').then(m => m.TabChatPageModule)
        },
        {
          path: 'clase',
          loadChildren: () => import('../tabs/tab-clase/tab-clase.module').then(m => m.TabClasePageModule)
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
