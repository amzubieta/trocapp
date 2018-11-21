import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductImagePage } from './product-image';

@NgModule({
  declarations: [
    ProductImagePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductImagePage),
  ],
})
export class ProductImagePageModule {}
