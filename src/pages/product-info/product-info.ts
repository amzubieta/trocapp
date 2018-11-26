import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TabsPage } from './../tabs/tabs';

import { UserProvider } from './../../providers/user/user';
import { ProductProvider } from './../../providers/product/product';

@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfoPage {

  form: FormGroup;
  
  user: any;
  product: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private userProvider: UserProvider,
    private productProvider: ProductProvider
  ) {
    this.user = this.userProvider.get() || {};

    this.product = this.navParams.data.product || {};
    this.product.images = this.navParams.data.images || []

    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfoPage');
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.product.key],
      title: [this.product.title, Validators.required],
      description: [this.product.description, Validators.required],
      changePreferences: [this.product.changePreferences, Validators.required],
      images: [this.product.images],
      user: [this.user]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.productProvider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Producto registrado exitosamente', duration: 5000 }).present();
          this.navCtrl.setRoot(TabsPage);
        })
        .catch((e) => {
          this.toast.create({ message: 'Se produjo un error inesperado al guardar el producto', duration: 3000 }).present();
          console.error(e);
        })
    }
  }
}
