import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHomeComponent } from './list-home/list-home.component';
import { ReceptDetailComponent } from './recept-detail/recept-detail.component';
import { ReceptListComponent } from './recept-list/recept-list.component';
import { SharedModule } from 'src/app/shared';
import { RouterModule } from '@angular/router';
import { ReceptRoutingModule } from './recepten-routing.module';



@NgModule({
  declarations: [ListHomeComponent, ReceptDetailComponent, ReceptListComponent],
  imports: [
    CommonModule,
    ReceptRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class ReceptenModule { }
