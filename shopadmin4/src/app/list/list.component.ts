import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import {OrderService} from '../service/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
orders : Observable<any[]>;
  constructor(private OrderService :OrderService) { 
    
  }

  ngOnInit(){
    this.orders=this.OrderService.getOrders();
  }

}
