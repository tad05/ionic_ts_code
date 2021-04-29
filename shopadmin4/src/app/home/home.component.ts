// login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService} from '../service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') //emial 인증 패턴
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
    });
  }


  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
      this.router.navigate(["dash"]);
      }, err => {
        alert('로그인에 실패하였습니다.');
        this.router.navigate(["home"]);
      })
  }



}
