import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera'
import { ImagePicker } from '@ionic-native/image-picker';

import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { MessagesPage } from '../pages/messages/messages';
import { ProductImagePage } from '../pages/product-image/product-image';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { UserProvider } from '../providers/user/user';
import { ProductProvider } from '../providers/product/product';
import { InterestProvider } from '../providers/interest/interest';

import * as ionicGalleryModal from 'ionic-gallery-modal'
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'

// YOUR_FIREBASE_CONFIG
var config = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId"
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SearchPage,
    MessagesPage,
    ProductImagePage,
    UserPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ionicGalleryModal.GalleryModalModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SearchPage,
    MessagesPage,
    ProductImagePage,
    UserPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HAMMER_GESTURE_CONFIG, useClass: ionicGalleryModal.GalleryModalHammerConfig},
    UserProvider,
    ProductProvider,
    InterestProvider
  ]
})
export class AppModule {}
