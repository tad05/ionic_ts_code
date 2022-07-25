import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { menuController } from '@ionic/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPage implements OnInit {
  constructor(private navCtrl: NavController) {}
  scanState = false;
  ngOnInit() {}

  QR() {
    this.scanState = true;
    this.navCtrl.navigateForward('/qrscan');
  }
  order() {
    this.navCtrl.navigateForward('/home');
  }
}
