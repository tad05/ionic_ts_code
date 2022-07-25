import { Component, ElementRef, ViewChild } from '@angular/core';
import { Animation, AnimationController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartPage } from '../cart/cart.page';
import { UserPage } from '../user/user.page';
import { ProductService } from '../services/product.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  products: Observable<any[]>;
  @ViewChild('myfab', { read: ElementRef }) cartBtn: ElementRef;
  cartAnimation: Animation;
  cart = {};
  name: string;
  address: string;
  phone: number;
  cartKey: ProductService["cartKey"];
  constructor(private afs: AngularFirestore, private navCtrl: NavController, private ProductService: ProductService, private animationCtrl: AnimationController, private modalCtrl: ModalController) { }



  ngOnInit() {
    this.products = this.ProductService.getProducts();

    this.ProductService.cart.subscribe(value => {
      console.log('MY CART NOW: ', value);
      this.cart = value;
    })
  }
  home() {
    this.navCtrl.navigateForward('/main');
  }
  ngAfterViewInit() {
    this.cartAnimation = this.animationCtrl.create('cart-animation');
    this.cartAnimation
      .addElement(this.cartBtn.nativeElement)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.2)' },
        { offset: 0.8, transform: 'scale(0.9)' },
        { offset: 1, transform: 'scale(1)' },
      ])
      .duration(300)
      .easing('ease-out')
  }

  addUser() {
    this.ProductService.addUser();
    // this.afs.collection('carts').doc(this.cartKey).update({
    //   이름 : this.name,
    //   주소 : this.address


    // });
  }
  addToCart(event, product) {
    event.stopPropagation();
    this.ProductService.addToCart(product.id);
    this.cartAnimation.play();
  }

  removeFromCart(event, product) {
    event.stopPropagation();
    this.ProductService.removeFromCart(product.id);
    this.cartAnimation.play();
  }

  async openCart() {
    // const modal=await this.modalCtrl.create({
    //   component : UserPage
    // });
    // await modal.present();
    this.navCtrl.navigateForward('user');
  }

}
