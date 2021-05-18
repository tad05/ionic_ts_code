import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs-routing.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'maps',
        loadChildren: () =>
          import('../maps/maps.module').then(m => m.MapsPageModule)
      },
      {
        path: 'scanner',
        loadChildren: () =>
          import('../scanner/scanner.module').then(m => m.ScannerPageModule)
      }
    ]
  },
  {
    path: 'tabs',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
