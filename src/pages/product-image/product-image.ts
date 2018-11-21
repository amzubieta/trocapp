import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-product-image',
  templateUrl: 'product-image.html',
})
export class ProductImagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductImagePage');
  }

  uploadImages() {
    this.navCtrl.push('ProductInfoPage')
  }
}
