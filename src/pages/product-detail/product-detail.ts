import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { GalleryModal } from 'ionic-gallery-modal';

import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  public product: any
  public photos: any[] = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private userProvider: UserProvider
  ) {
    this.product = this.navParams.data.product
    for(let i=0; i<this.product.images.length; i++) {
      this.photos.push({
        url: this.product.images[i]
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  showImageGallery() {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos
    });
    modal.present();
  }

  contactProduct(product: any) {
    let me = this.userProvider.get()
    this.navCtrl.push('ChatPage', {
      productId: product.key,
      interestedUserId: this.userProvider.get().uid
    })
  }
}
