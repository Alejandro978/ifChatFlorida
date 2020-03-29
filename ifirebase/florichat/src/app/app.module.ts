import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { FireBaseConfig } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth"
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { ChatModalComponent } from './components/chat-modal/chat-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ChatModalComponent],

  entryComponents: [ChatModalComponent],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],

  providers: [
    StatusBar,
    SplashScreen,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    //Se añade esta línea por si da errores al traer datos
    { provide: FirestoreSettingsToken, useValue: {} }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
