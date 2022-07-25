import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HomePage } from '../home/home.page';
//import { ProductService } from '../services/product.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authentication.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit {
  products = [];
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const cartItems = this.authService.cart.value;
    console.log('cart: ', cartItems);

    this.authService
      .getProducts()
      .pipe(take(1))
      .subscribe(allProducts => {
        this.products = allProducts
          .filter(p => cartItems[p.id])
          .map(product => {
            return { ...product, count: cartItems[product.id] };
          });
        console.log('cart: ', this.products);
        //const filtered=allProducts.filter(p=>cartItems[p.id]);
        // console.log('Filtered: ',filtered);

        // const mapped=filtered.map(product => {
        //   return{...product,const:cartItems[product.id]};
        // })
        //console.log('mapped: ',mapped);
        //this.products=allProducts.filter(p=> cartItems[p.id]).map(product=>{
      });
    // this.carts=this.ProductService.getCarts();
  }
  close() {
    this.navCtrl.navigateForward('/home');
  }

  async checkout() {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: '주문이 완료되었습니다.',
      buttons: ['확인']
    });
    await alert.present();
    this.navCtrl.navigateForward('/home');
    // this.modalCtrl.dismiss();
    this.authService.checkoutCart();
    //console.log(docID);
    //this.authService.addToOrder(docID);
    // this.modalCtrl.dismiss();
  }
}
