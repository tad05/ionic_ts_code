import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import firebase from 'firebase/app';
import { User } from '../models/user';
import { HomePage } from '../home/home.page';
import { LoginPage } from '../login/login.page';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from './authentication.service';
const CART_STORAGE_KEY = 'MY_CART';

const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  name: HomePage['name'];
  address: HomePage['address'];
  cart = new BehaviorSubject({});
  productsCollection: AngularFirestoreCollection;
  user = new BehaviorSubject({});
  cartKey = null;
  orderKey = null;
  cartsCollection: AngularFirestoreCollection;
  ordersCollection: AngularFirestoreCollection;
  u_ordersCollection: AngularFirestoreCollection;
  uidCollection: AngularFirestoreCollection;
  e_val: any;
  constructor(
    private afs: AngularFirestore,
    public fireservices: AngularFirestore
  ) {
    this.productsCollection = this.afs.collection('products');
    this.cartsCollection = this.afs.collection('carts');
    this.ordersCollection = this.afs.collection('orders');

    this.loadCart();
  }

  put_login_id(value) {
    var new_doc = '';
    var dec_doc = '';
    this.e_val = value.email;
    this.uidCollection = this.afs.collection('User', ref =>
      ref.where('email', '==', this.e_val)
    );
    console.log(this.uidCollection);
    this.uidCollection
      .get()
      .toPromise()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          new_doc = doc.id;
          //console.log(doc.id, ' => ', doc.data());
        });
      });
    this.u_ordersCollection = this.afs
      .collection('User')
      .doc('BxOfiA55tQQqR90byVJe')
      .collection('orders_id');
  }

  create_Newuser(Record) {
    // return this.fireservices.collection('User').add(Record);
    return this.afs
      .collection('carts')
      .doc(this.cartKey)
      .update(Record);
  }
  getProducts() {
    console.log(this.productsCollection);
    return this.productsCollection.valueChanges({ idField: 'id' });
  }
  // getCarts(){
  //   return this.afs.collection('carts').doc(this.cartKey).get();
  // }
  getOrders() {
    return this.ordersCollection.valueChanges({ idField: 'id' });
  }
  getUserOrders() {
    return this.u_ordersCollection.valueChanges({ idField: 'id' });
  }
  async loadCart() {
    const result = await Storage.get({ key: CART_STORAGE_KEY });
    console.log('Cart from stoarge: ', result);

    if (result.value) {
      this.cartKey = result.value;

      this.afs
        .collection('carts')
        .doc(this.cartKey)
        .valueChanges()
        .subscribe((result: any) => {
          delete result['lastUpdate'];
          console.log('cart changed :', result);
          this.cart.next(result || {});
        });
      //already have a cart
    } else {
      const fbDocument = await this.afs.collection('carts').add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log('new cart:', fbDocument);
      this.cartKey = fbDocument.id;
      await Storage.set({ key: CART_STORAGE_KEY, value: this.cartKey });
    }
  }

  addToCart(id) {
    this.afs
      .collection('carts')
      .doc(this.cartKey)
      .update({
        [id]: INCREMENT,
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        사업자번호: 'AA',
        사업자: '택배왔조',
        기사: '미지정',
        배송상태: '',
        주문번호: '미지정'
      });

    // this.productsCollection.doc(id).update({
    //   stock:DECREMENT
    // });
  }
  addUser() {
    this.afs
      .collection('carts')
      .doc(this.cartKey)
      .update({
        이름: this.name,
        주소: this.address
      });
  }

  removeFromCart(id) {
    this.afs
      .collection('carts')
      .doc(this.cartKey)
      .update({
        [id]: DECREMENT,
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
      });

    // this.productsCollection.doc(id).update({
    //   stock:INCREMENT
    // });
  }
  async checkoutCart() {
    await this.afs.collection('orders').add(this.cart.value);
    // await this.afs.collection('orders').add(this.user.value);
    // this.afs.collection('orders').doc(this.cartKey).set({

    // })
    this.afs
      .collection('carts')
      .doc(this.cartKey)
      .set({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
      });
  }
}
