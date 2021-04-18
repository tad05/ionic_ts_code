import { getLocaleTimeFormat } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private storage: Storage) { }

  async ngOnInit() {
    //if using a custom driver:
    //await this.storage.defineDriver(MyCustomDirver)
    await this.storage.create();
  }

}
