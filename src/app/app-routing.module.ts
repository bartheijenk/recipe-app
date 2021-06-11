import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';
import { ReceptResolver } from './core/resolvers';
import { ReceptInvoerComponent } from './modules/recepten/recept-invoer/recept-invoer.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'recepten', loadChildren: () => import('./modules/recepten/recepten.module').then(m => m.ReceptenModule) },
  { path: 'invoer', component: ReceptInvoerComponent, canActivate: [AuthGuard], },
  {
    path: 'invoer/:id', component: ReceptInvoerComponent,
    resolve: {
      recept: ReceptResolver
    }
  },
  { path: 'search', loadChildren: () => import ('./modules/search/search.module').then(m => m.SearchModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
