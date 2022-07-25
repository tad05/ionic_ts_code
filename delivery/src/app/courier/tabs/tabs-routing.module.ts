import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { CourierAppComponent } from '../courier-app/courier-app.component';
const routes: Routes = [
  {
    path: '',
    component: TabsPage
  },
  { path: 'courier-app', component: CourierAppComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
