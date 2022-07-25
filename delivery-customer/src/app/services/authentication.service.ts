// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//   constructor() { }
// }

// authentication.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  fromDocRef
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import firebase from 'firebase/app';
// import { User } from '../models/user';

import { HomePage } from '../home/home.page';
export interface User {
  username: string;
  uid: string;
}
const CART_STORAGE_KEY = 'MY_CART';

const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private user: User;
  profileName: any;
  profileEmail: any;
  name: HomePage['name'];
  address: HomePage['address'];
  cart = new BehaviorSubject({});
  productsCollection: AngularFirestoreCollection;
  // user = new BehaviorSubject({});
  cartKey = null;
  orderKey = null;
  cartsCollection: AngularFirestoreCollection;
  orderCollection: AngularFirestoreCollection;
  qrCollection: AngularFirestoreCollection;
  aaCollection: AngularFirestoreCollection;
  authKey = null;
  values: any;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public fireservices: AngularFirestore
  ) {
    this.productsCollection = this.afs.collection('products');
    this.cartsCollection = this.afs.collection('carts');
    this.aaCollection = this.afs.collection('profile');
    // this.orderCollection= this.afs.collection(`profile/${this.getUserUid()}/cart`);
    this.loadCart();
  }
  getOrders() {
    this.orderCollection = this.afs.collection(
      `profile/${this.getUserUid()}/cart`
    );
    return this.orderCollection.valueChanges({ idField: 'id' });
  }

  setUser(user: User) {
    return (this.user = user);
  }

  getUserUid(): string {
    return this.user.uid;
  }
  loginFireauth(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), error => reject(error));
    });
  }

  userRegistration(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), error => reject(error));
    });
  }
  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), err => reject(err));
    });
  }
  // async useradd(value) {
  //   const fbDocument = await this.afs.collection('User').add({

  //     email: value.email
  //   });
  //   this.authKey = fbDocument.id;

  // }
  // create_NewU(Record) {
  //   return this.afs.collection('User').doc(this.authKey).update(Record);
  // }
  // loginUser(value) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.afAuth.signInWithEmailAndPassword(value.email, value.password)
  //       .then(
  //         res => resolve(res),
  //         err => reject(err))
  //   })
  // }

  // logoutUser() {
  //   return new Promise((resolve, reject) => {
  //     if (this.afAuth.currentUser) {
  //       this.afAuth.signOut()
  //         .then(() => {
  //           console.log("LOG Out");
  //           resolve();
  //         }).catch((error) => {
  //           reject();
  //         });
  //     }
  //   })
  // }

  userDetails() {
    return this.afAuth.user;
  }
  create_user(Record) {
    // return this.fireservices.collection('User').add(Record);
    return this.afs.doc(`profile/${this.getUserUid()}`).update(Record);
  }
  create_Newuser(Record) {
    // return this.fireservices.collection('User').add(Record);
    return this.afs
      .collection('carts')
      .doc(this.cartKey)
      .update(Record);
  }
  getProducts() {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }
  // getCarts(){
  //   return this.afs.collection('carts').doc(this.cartKey).get();
  // }
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
        dname: '미지정',
        dstate: '',
        주문번호: '미지정'
      });
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

  // async checkoutCart() {
  //   await this.afs.collection('orders').add(this.cart.value);
  //   // await this.afs.collection('orders').add(this.user.value);
  //   // this.afs.collection('orders').doc(this.cartKey).set({

  //   // })
  //   this.afs.collection('carts').doc(this.cartKey).set({
  //     lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
  //   })

  // }

  addToOrder(docID) {
    console.log(docID);
  }

  checkoutCart() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('AUTH_USER', user);
      if (user) {
        const result = this.afs.doc(`/profile/${this.getUserUid()}`);
        var userProfile = result.valueChanges();
        userProfile.subscribe(profile => {
          console.log('PROFILE::', profile);
          console.log(Object.keys(profile));
          this.profileName = profile['name'];
          this.profileEmail = profile['email'];
        });
        const docRef = this.afs
          .collection(`profile/${this.getUserUid()}/cart`)
          .doc();
        docRef.set(this.cart.value);
        const orderRef = this.afs.collection('orders').doc(docRef.ref.id);
        orderRef.set(this.cart.value);
      }
    });
    // await this.afs.collection('orders').add(this.cart.value);
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
