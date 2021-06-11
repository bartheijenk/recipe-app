import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptListComponent } from '../recepten/recept-list/recept-list.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';

const routes: Routes = [
  {path: '', component: AdvancedSearchComponent,
    children: [
      {path: 'results', component: ReceptListComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
