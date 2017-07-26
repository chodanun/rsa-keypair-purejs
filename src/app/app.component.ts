import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

// RSA
import * as en from 'jsrsasign';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  KEYUTIL: any;
  prvPem: any;
  prvKeyObj: any;
  enMsg: any;

  KJUR: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.init();
    });
  }

  init(){
    let obj;
    this.KEYUTIL = en.KEYUTIL;
    obj = this.KEYUTIL.generateKeypair('RSA','1024');
    console.log(obj)
    let pubPem = this.KEYUTIL.getPEM(obj.pubKeyObj) 
    let prvPem = this.KEYUTIL.getPEM(obj.prvKeyObj,"PKCS1PRV") 
    console.log(pubPem)
    console.log(prvPem)

    this.prvPem = prvPem ;
    this.prvKeyObj = obj.prvKeyObj;

    
    
  }

  decrypt(){
    let x = en.KJUR.crypto.Cipher.decrypt(this.enMsg,this.prvKeyObj,'RSA');
    // let x = this.KJUR.decrypt
    console.log(x);

  }
}

