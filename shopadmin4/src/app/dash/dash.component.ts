import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  userEmail: string;
  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit(){
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.router.navigate(["home"]);
      }
    }, err => {
      console.log('err', err);
    })
}
}