import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsPageRoutingModule } from './maps-routing.module';

import { MapsPage } from './maps.page';
import { CourierAppComponent } from '../courier-app/courier-app.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MapsPageRoutingModule],
  declarations: [MapsPage, CourierAppComponent]
})
export class MapsPageModule {}
