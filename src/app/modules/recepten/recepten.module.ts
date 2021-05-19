import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptenRoutingModule } from './recepten-routing.module';
import { ReceptenComponent } from './recepten.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { ListHomeComponent } from './list-home/list-home.component';
import { ReceptDetailComponent } from './recept-detail/recept-detail.component';
import { ReceptListComponent } from './recept-list/recept-list.component';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [
    ReceptenComponent,
    CategorieListComponent,
    ListHomeComponent,
    ReceptDetailComponent,
    ReceptListComponent
  ],
  imports: [
    CommonModule,
    ReceptenRoutingModule,
    SharedModule
  ]
})
export class ReceptenModule { }
