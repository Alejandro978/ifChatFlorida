import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;
  @Input() avatar: string;

  constructor(
    public actionSheetController: ActionSheetController,
    private storage: Storage,
    private navCtrl: NavController

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
    this.navCtrl.navigateRoot('/login', { animated: true });
    this.storage.clear();
  }
}
