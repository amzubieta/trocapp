import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/map'

export interface Message {
  roomId: string;
  user: any;
  message: string;
  date: Date;
}

@Injectable()
export class InterestProvider {

  private MESSAGES_PATH = 'messages/';
  private ROOMS_PATH = 'rooms/';

  constructor(private db: AngularFireDatabase) {
    console.log('Hello InterestProvider Provider');
  }

  getRoomId(product: any, user: any) {
    return `${product.key}_${user.uid}`;
  }

  getMyInterestRooms(userUid) {
    return this.db.list(this.ROOMS_PATH, ref => ref.orderByChild('interestedUserId').equalTo(userUid))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  getInterestsOnMyProducts(userUid) {
    return this.db.list(this.ROOMS_PATH, ref => ref.orderByChild('productOwnerUserId').equalTo(userUid))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  getMessagesForRoom(roomId) {
    return this.db.list(this.MESSAGES_PATH, ref => ref.orderByChild('roomId').equalTo(roomId))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  addMessage(message: Message) {
    return new Promise((resolve, reject) => {
      this.db.list(this.MESSAGES_PATH)
        .push(message)
        .then(obj => resolve({ key: obj.key, ...message }))
    })
  }

  
  getRoomById(roomId: string) {
    return new Promise((resolve, reject) => {
      this.db.list(this.ROOMS_PATH, ref => ref.orderByChild('roomId').equalTo(roomId))
        .snapshotChanges()
        .subscribe(queriedItems => {
          if (typeof queriedItems !== 'undefined' && queriedItems.length > 0) {
            resolve({ __key: queriedItems[0].key, ...queriedItems[0].payload.val() });
          }

          console.debug(`Room ${roomId} non stored in 'rooms' db`);
          resolve()
        })
    });
  }

  updateRoom(roomId: string, room: any) {
    return new Promise((resolve, reject) => {
      this.db.list(this.ROOMS_PATH)
        .set(roomId, room)
        .then(obj => resolve(room))
    })
  }
}
