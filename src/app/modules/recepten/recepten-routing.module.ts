import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { ListHomeComponent } from './list-home/list-home.component';
import { ReceptDetailComponent } from './recept-detail/recept-detail.component';
import { ReceptListComponent } from './recept-list/recept-list.component';
import { ReceptenComponent } from './recepten.component';

const routes: Routes = [
  {
    path: '', component: ListHomeComponent,
    children: [
      { path: 'lijst/:id', component: ReceptListComponent },
      { path: 'lijst', component: ReceptListComponent, },
      { path: 'catlijst', component: CategorieListComponent },
      { path: ':id', component: ReceptDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptenRoutingModule { }
