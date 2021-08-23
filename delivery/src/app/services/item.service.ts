import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  //queryCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  //query: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    //this.items = this.afs.collection('D_orders').valueChanges();
    this.items = this.afs
      .collection('D_orders', ref => ref.where('기사', '==', '지정'))
      .valueChanges();
  }

  getItems() {
    console.log(this.items);
    return this.items;
  }
}
