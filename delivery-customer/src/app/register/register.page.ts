import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authentication.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  validationMessages = {
    names: [{ type: 'required', message: '이름을 입력해주세요.' }],
    phone: [{ type: 'required', message: '전화번호를 입력해주세요.' }],
    email: [{ type: 'required', message: '이메일을 입력해주세요.' }],
    password: [
      { type: 'required', message: '비밀번호를 6자리 이상 입력해주세요.' }
    ]
  };
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      phone: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }
  // tryRegister(value) {
  //   this.authService.registerUser(value)
  //     .then(res => {
  //       console.log(res);
  //       this.errorMessage = "";
  //       this.successMessage = "Your account has been created. Please log in.";
  //       alert('이름, 주소, 전화번호를 입력해주세요.')
  //       this.authService.useradd(value)
  //       this.router.navigate(["info"]);
  //     }, err => {
  //       console.log(err);
  //       this.errorMessage = err.message;
  //       this.successMessage = "";
  //       alert('중복된 계정입니다.\r\n유효한 이메일, 6자 이상의 비밀번호를 확인하여주십시오.')
  //     })

  // }
  registerUser(value) {
    try {
      this.authService.userRegistration(value).then(
        response => {
          console.log(response);
          if (response.user) {
            response.user.updateProfile({
              displayName: value.name,
              phoneNumber: value.phone,
              email: value.email
            });
            this.router.navigate(['login']);
          }
        },
        error => {
          this.errorLoading(error.message);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async errorLoading(message: any) {
    const loading = await this.alertCtrl.create({
      header: 'Error Registering',
      message: message,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.router.navigate(['login']);
          }
        }
      ]
    });
  }
}
