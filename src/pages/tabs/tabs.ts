import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { MessagesPage } from '../messages/messages';
import { ProductImagePage } from '../product-image/product-image';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  searchRoot = SearchPage;
  messagesRoot = MessagesPage;
  productImageRoot = ProductImagePage;
  userRoot = UserPage;

  constructor() {

  }
}
