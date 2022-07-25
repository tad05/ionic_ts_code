import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dhome',
    pathMatch: 'full'
  },
  {
    path: 'courier',
    loadChildren: () =>
      import('./courier/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'dhome',
    loadChildren: () =>
      import('./dhome/dhome.module').then(m => m.DHomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
