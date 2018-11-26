import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { UserProvider } from './../../providers/user/user';
import { InterestProvider } from './../../providers/interest/interest';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  public messagesView: string = "myInterests"

  myInterests: Observable<any>
  interestOnMyProducts: Observable<any>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userProvider: UserProvider,
    private interestProvider: InterestProvider
  ) {
    let user = this.userProvider.get()

    this.myInterests = this.interestProvider.getMyInterestRooms(user.uid)
    this.interestOnMyProducts = this.interestProvider.getInterestsOnMyProducts(user.uid)
  }

  showMessageDetail(interest: any) {
    this.navCtrl.push('ChatPage', { roomId: interest.key })
  }
}
