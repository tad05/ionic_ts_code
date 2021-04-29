import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage implements OnInit {
  @ViewChild(IonTabs) tabs: IonTabs;
  selected = '';
  constructor() {}

  ngOnInit() {}
  setSelectedTab() {
    console.log('CALLED');
    this.selected = this.tabs.getSelected();
  }
}
