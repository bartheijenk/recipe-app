import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ReceptResolver } from 'src/app/core/resolvers/recept.resolver';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { ListHomeComponent } from './list-home/list-home.component';
import { ReceptDetailComponent } from './recept-detail/recept-detail.component';
import { ReceptInvoerComponent } from './recept-invoer/recept-invoer.component';
import { ReceptListComponent } from './recept-list/recept-list.component';
import { ReceptenComponent } from './recepten.component';

const routes: Routes = [

  {
    path: '', component: ReceptenComponent,
    children: [
      {
        path: '', component: ListHomeComponent, children: [
          { path: 'lijst/:id', component: ReceptListComponent },
          { path: 'lijst', component: ReceptListComponent, },
          { path: 'catlijst', component: CategorieListComponent },
        ]
      },
      {
        path: ':id', component: ReceptDetailComponent,
        resolve: {
          recept: ReceptResolver
        }
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptenRoutingModule { }
