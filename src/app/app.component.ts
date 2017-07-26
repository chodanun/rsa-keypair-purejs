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
    let keyObjPub = this.KEYUTIL.getKey({n: obj.pubKeyObj.n , e: obj.pubKeyObj.e });
    // let keyObjPrv = this.KEYUTIL.getKey({n: obj.prvKeyObj.n, e: obj.prvKeyObj.e, d: obj.prvKeyObj.d, p: obj.prvKeyObj.p, q: obj.prvKeyObj.q, dmp1: obj.prvKeyObj.dmp1, dmq1: obj.prvKeyObj.dmq1, co: obj.prvKeyObj.co});
    console.log(keyObjPub)
    // console.log(keyObjPrv)
    let pubPem = this.KEYUTIL.getPEM(obj.pubKeyObj) 
    let prvPem = this.KEYUTIL.getPEM(obj.prvKeyObj,"PKCS1PRV") 
    console.log(pubPem)
    console.log(prvPem)

    // let obj2 = this.KEYUTIL.getJWKFromKey(obj.pubKeyObj);
    // console.log(obj2);
  }
}

