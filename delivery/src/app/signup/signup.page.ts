import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {

  users: any[] = []

  constructor(private storage: Storage) {

  }

  async ngOnInit() {
    // if using a custom driver:
    //await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  async addUser(name: string, phone: number) {
    this.storage.set(name, phone).then(() => {
      let user = {
        name,
        phone
      };
      //UI를 갱신하기 위해 인메모리 변수를 업데이트한다
      this.users.push(user);
      //폼을 리셋한다.
      name = "";
      phone = null;
    });
  }

}

/*
export class SignupPage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  signUp(name, phone){
  }
*/