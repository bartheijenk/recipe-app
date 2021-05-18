import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule, SharedModule } from 'src/app/shared';
import { CoreModule } from 'src/app/core';
import { ReceptListComponent } from './components/recept-list/recept-list.component';
import { ReceptDetailComponent } from './components/recept-detail/recept-detail.component';
import { RouterModule } from '@angular/router';
import { ListHomeComponent } from './components/list-home/list-home.component';


@NgModule({
  declarations: [
    HomeComponent,
    ReceptListComponent,
    ReceptDetailComponent,
    ListHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class HomeModule { }
