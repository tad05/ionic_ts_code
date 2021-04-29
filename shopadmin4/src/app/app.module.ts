import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { DashComponent } from './dash/dash.component';
import { environment } from '../environments/environment';
import {productenvironment} from '../environments/productenviroment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule.initializeApp(productenvironment.firebase),AngularFirestoreModule
    , AngularFireAuthModule, AppRoutingModule,  FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
