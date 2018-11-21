import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProductImagePage } from '../product-image/product-image';
import { ContactPage } from '../contact/contact';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  searchRoot = HomePage;
  chatRoot = ContactPage;
  productImageRoot = ProductImagePage;
  profileRoot = AboutPage;

  constructor() {

  }
}
