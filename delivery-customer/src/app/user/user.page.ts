import { Component, OnInit, Renderer2 } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import {
  Animation,
  AnimationController,
  ModalController
} from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartPage } from '../cart/cart.page';
// import { ProductService } from '../services/product.service';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { postcode } from './postcode.js';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
  frm: FormGroup;
  aname: string;
  aaddress: string;
  aphone: string;
  daaddress: string;
  profile: any;
  profileName: any;
  profileEmail: any;
  profilephone: any;
  profileaddress: any;
  profiledaddress: any;
  @ViewChild('daum_popup', { read: ElementRef, static: true })
  popup: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private database: AngularFirestore,
    private renderer: Renderer2,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private animationCtrl: AnimationController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.frm = this.formBuilder.group({
      aaddress: ['']
    });
    firebase.auth().onAuthStateChanged(user => {
      console.log('AUTH_USER', user);

      if (user) {
        const result = this.database.doc(
          `/profile/${this.authService.getUserUid()}`
        );
        console.log(result);
        var userProfile = result.valueChanges();
        console.log(userProfile);
        userProfile.subscribe(profile => {
          console.log('PROFILE::', profile);
          this.profileName = profile['name'];
          this.profileEmail = profile['email'];
          this.profilephone = profile['phonenumber'];
          this.profileaddress = profile['address'];
          this.profiledaddress = profile['detailaddress'];
        });
      }
    });
  }
  async CreateUser() {
    let Record = {};
    Record['name'] = this.aname;
    Record['address'] = this.aaddress;
    Record['detailaddress'] = this.daaddress;
    Record['phonenumber'] = this.aphone;

    this.authService.create_Newuser(Record).then(res => {
      this.aname = '';
      this.aaddress = '';
      this.daaddress = '';
      this.aphone = '';
    });
    // const modal = await this.modalCtrl.create({
    //   component: CartPage
    // });
    // await modal.present();
    this.navCtrl.navigateForward('cart');
  }
  // async orderout() {
  //   const modal = await this.modalCtrl.create({
  //     component: CartPage
  //   });
  //   await modal.present();
  // }

  close() {
    this.navCtrl.navigateForward('/home');
  }
  openDaumPopup() {
    postcode(this.renderer, this.popup.nativeElement, data => {
      this.frm.controls.aaddress.setValue(data.jibunAddress);
      console.log(data);
    });
  }

  closeDaumPopup() {
    this.renderer.setStyle(this.popup.nativeElement, 'display', 'none');
  }
}
