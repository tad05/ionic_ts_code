// login.page.ts
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import firebase from 'firebase/app';
import { LoadingController } from '@ionic/angular';
const INCREMENT = firebase.firestore.FieldValue.increment(1);
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    public loadingController: LoadingController,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore
  ) {}
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }
  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }

  LoginUser(value) {
    // console.log("login");
    this.presentLoading();
    try {
      this.authService.loginFireauth(value).then(
        resp => {
          console.log(resp);
          this.authService.setUser({
            username: resp.user.displayName,
            uid: resp.user.uid
          });
          if (resp.user) {
            const userProfile = this.firestore
              .collection('profile')
              .doc(resp.user.uid);
            ///

            userProfile.get().subscribe(result => {
              this.navCtrl.navigateForward(['shop/home']);
              if (result.exists) {
                this.navCtrl.navigateForward(['shop/home']);
              } else {
                this.firestore
                  .doc(`profile/${this.authService.getUserUid()}`)
                  .set({
                    name: resp.user.displayName,
                    email: resp.user.email
                  });
                this.firestore
                  .doc(
                    `profile/${this.authService.getUserUid()}/basket/${this.authService.getUserUid()}`
                  )
                  .set({
                    lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
                  });
              }
            });
          }
        },
        err => {
          alert('로그인 정보가 일치하지 않습니다.');
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  // loginUser(value) {
  //   this.authService.loginUser(value)
  //     .then(res => {
  //       console.log(res);
  //       this.errorMessage = "";
  //       this.navCtrl.navigateForward('/main');
  //     }, err => {
  //       alert('로그인 정보가 일치하지 않습니다.')
  //     })
  // }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }
}
