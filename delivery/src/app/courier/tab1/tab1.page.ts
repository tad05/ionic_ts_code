import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from 'src/app/models/item';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page implements OnInit {
  items?: Item[];
  //currentIndex = -1;
  constructor(public itemService: ItemService) {}
  showButton = false;

  ngOnInit() {
    //console.log('ngOnit ran')
    this.itemService.getItems().subscribe(items => {
      console.log(items);
      this.items = items;
    });
  }
  async show() {
    if (this.showButton == true) {
      this.showButton = false;
    } else {
      this.showButton = true;
    }
  }

  segmentChanged(event: any) {
    console.log(event.target.value);
  }

  //selectitem() {
  //  this.itemService.getItems().subscribe(items => {
  //    console.log(items.forEach)
  //  })
  //}
  //setActiveitem(items: Item, index: number): void {
  //  this.currentIndex = index;
  //  console.log("test1")
  //  console.log(index)
  //  console.log("test2")
  //  console.log(items.name) // kkk
  //this.itemService.itemsCollection.ref.where("name", "==", items.name)
  //}
}
