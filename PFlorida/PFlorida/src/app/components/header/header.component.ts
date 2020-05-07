import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;

  constructor(
    public actionSheetController: ActionSheetController
  ) {
  }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.logout();
        }
      }]
    });
    await actionSheet.present();
  }

  logout() {

  }
}
