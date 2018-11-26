import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take'; 

import { ProductProvider } from './../../providers/product/product';
import { UserProvider } from './../../providers/user/user';
import { InterestProvider } from './../../providers/interest/interest';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  product: any
  interestedUser: any
  currentUser: any

  messages: Observable<any>

  searchText: string

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private userProvider: UserProvider,
    private interestProvider: InterestProvider
  ) {

    this.currentUser = this.userProvider.get()
    
    console.log(`CHAT!! ${JSON.stringify(this.navParams.data)}`)
    if(this.navParams.data.roomId) {
      this.interestProvider
        .getRoomById(this.navParams.data.roomId)
        .then((room: any) => {
          this.userProvider
            .getByUid(room.interestedUserId)
            .then(interestedUser => { this.interestedUser = interestedUser })
          this.product = room.product
          
          this.loadMessagesFromRoom(room.roomId)
        })
        .catch(err => console.error(err))
    } else {
      this.userProvider.getByUid(this.navParams.data.interestedUserId)
        .then(interestedUser => {
          this.interestedUser = interestedUser 

          this.productProvider
            .getByKey(this.navParams.data.productId)
            .then(p => { 
              this.product = p 

              let roomId = this.interestProvider.getRoomId(p, interestedUser)
              this.loadMessagesFromRoom(roomId)
            })
        })
        .catch(err => console.error(err))
    }
  }

  getProduct() {
    return this.product
  }

  loadMessagesFromRoom(roomId: string) {
    this.messages = this.interestProvider.getMessagesForRoom(roomId)
  }

  addMessage() {
    const roomId = this.interestProvider.getRoomId(this.product, this.interestedUser)
    const message = {
      roomId: roomId,
      user: this.currentUser,
      message: this.searchText,
      date: new Date()
    }

    this.interestProvider.addMessage(message)
    this.interestProvider.updateRoom(roomId, {
      roomId: roomId,
      interestedUserId: this.interestedUser.uid,
      product: this.product,
      productOwnerUserId: this.product.user.uid,
      lastMessage: message.message,
      date: message.date
    })

    this.searchText = ''
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  goToMessages() {
    this.navCtrl.popToRoot()
  }
}
