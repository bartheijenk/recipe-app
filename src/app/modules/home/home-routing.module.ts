import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptDetailComponent } from './components/recept-detail/recept-detail.component';
import { ReceptListComponent } from './components/recept-list/recept-list.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'receptenlijst', component: ReceptListComponent },
  { path: 'recept/:id', component: ReceptDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
