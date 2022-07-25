import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-courier-app',
  templateUrl: './courier-app.component.html',
  styleUrls: ['./courier-app.component.scss']
})
export class CourierAppComponent implements OnInit {
  private database: AngularFirestore; // 파이어스토어를 쓸건데 그건 private해야겠지 당연히. database는 내가 지은 이름이고.
  private itemCollection: AngularFirestoreCollection<any>; //collection을 가져올건데 일단 다 가져와
  collections: Array<Object> = [];
  private storage: AngularFireStorage; // 나중에 쓸
  tang: object; // 지금 user에 객체 2개가 만들어져있으니까 객체 타입으로 받는다 하고
  constructor(db: AngularFirestore) {
    // AngularFirestore을 db라는 이름으로 가져올거고
    this.database = db; // this.database 가 AngularFirestore 이라는 걸 알려주고
    this.getItem('cusinfo').subscribe(res => {
      // 아까 firestore페이지에서 user 라는 collection 만들었었잖아. 그거 구독하자.
      console.log('1' + res);
      this.tang = this.database;
      this.collections = res;
    });
  }

  getItem(db_name: string) {
    // getItem() 의 인자로 들어가는 이름의 collection에 접근을 할 거라고 설정
    this.itemCollection = this.database.collection<any>(
      db_name,
      (ref: CollectionReference) => {
        console.log('3');
        return ref.orderBy('address', 'asc'); //시작, 한계점 추가
      }
    );
    return this.itemCollection.valueChanges(); //리턴
  }

  ngOnInit() {}
}
