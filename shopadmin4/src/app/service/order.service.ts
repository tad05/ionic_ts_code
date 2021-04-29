import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// const{Storage}=Plugins;
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersCollection : AngularFirestoreCollection;

  constructor(private afs:AngularFirestore) {
    this.ordersCollection=this.afs.collection('orders');
   }
   getOrders(){
     return this.ordersCollection.valueChanges({idField :'id'});
   }
}
