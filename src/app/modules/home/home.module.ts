import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared';
import { CoreModule } from 'src/app/core';
import { ReceptListComponent } from './components/recept-list/recept-list.component';
import { ReceptDetailComponent } from './components/recept-detail/recept-detail.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent,
    ReceptListComponent,
    ReceptDetailComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class HomeModule { }
