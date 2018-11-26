import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { ProductProvider } from './../../providers/product/product';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  products: Observable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private productProvider: ProductProvider) {

    this.products = this.productProvider.getAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  detailProduct(product: any) {
    this.navCtrl.push('ProductDetailPage', { product: product });
  }

}
