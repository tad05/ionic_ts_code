import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authentication.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss']
})
export class InfoPage {
  aname: string;
  aphone: string;
  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {}
  //   async CreateUser(){
  //     let Record={};
  //     Record['Name']=this.aname;
  //     Record['PhoneNumber']=this.aphone;

  //     this.authService.create_NewU(Record).then(res=>{
  //       this.aname="";
  //       this.aphone="";
  //     })
  //     alert('정상적으로 저장되었습니다.')
  //     this.navCtrl.navigateForward('/login');
  // }
}
