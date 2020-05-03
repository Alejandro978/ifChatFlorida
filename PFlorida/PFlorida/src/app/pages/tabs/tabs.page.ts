import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  userInfo: any;
  constructor(
    public router: Router,
    private storage: Storage
  ) {

  }

  ngOnInit() {
    this.router.navigate(['/tabs/chat']);
  }

}
