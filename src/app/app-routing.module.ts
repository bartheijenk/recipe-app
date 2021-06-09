import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ReceptResolver } from './core/resolvers/recept.resolver';
import { ReceptDetailComponent } from './modules/recepten/recept-detail/recept-detail.component';
import { ReceptInvoerComponent } from './modules/recepten/recept-invoer/recept-invoer.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'recepten', loadChildren: () => import('./modules/recepten/recepten.module').then(m => m.ReceptenModule) },
  {path: 'invoer', component: ReceptInvoerComponent, /*canActivate: [AuthGuard],*/},
    { path: 'invoer/:id', component: ReceptInvoerComponent,
        resolve: {
          recept: ReceptResolver
        }}
      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
