import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule, SharedModule } from 'src/app/shared';
import { CoreModule } from 'src/app/core';
import { RouterModule } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';


@NgModule({
  declarations: [
    HomeComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class HomeModule { }
