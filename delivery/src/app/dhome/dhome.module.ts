import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DhomePageRoutingModule } from './dhome-routing.module';

import { DhomePage } from './dhome.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DhomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DhomePage]
})
export class DHomePageModule { }
