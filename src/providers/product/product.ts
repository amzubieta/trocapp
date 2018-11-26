import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/map'

@Injectable()
export class ProductProvider {

  private PATH = 'products/';

  constructor(private db: AngularFireDatabase) {
    console.log('Hello ProductProvider Provider');
  }

  getAll() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  getByKey(key: any) {
    return new Promise((resolve, reject) => {
      this.db.list(this.PATH)
        .snapshotChanges()
        .subscribe(queriedItems => {

          queriedItems
            .filter(item => item.key === key)
            .map(item => resolve({ key: item.payload.key, ...item.payload.val() }))

          console.error(`Product ${key} non stored in 'products' db`);
          reject()
        })
    });
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        console.log(`Found Product: ${JSON.stringify({ key: c.key, ...c.payload.val() })}`)
        return { key: c.key, ...c.payload.val() };
      });
  }

  save(product: any) {
    return new Promise((resolve, reject) => {
      let document = {
        title: product.title || null,
        description: product.description || null,
        changePreferences: product.changePreferences || null,
        images: product.images || [],
        user: product.user || null,
      }


      if (product.__key) {
        this.db.list(this.PATH)
          .update(product.__key, document)
          .then(obj => resolve())
          .catch(e => reject(e))
      } else {
        this.db.list(this.PATH)
          .push(document)
          .then(obj => resolve({ __key: obj.key, ...document }))
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
