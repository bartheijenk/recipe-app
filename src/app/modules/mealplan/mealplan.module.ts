import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  DateAdapter,
  MOMENT,
} from 'angular-calendar';
import * as moment from 'moment';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { MealplanRoutingModule } from './mealplan-routing.module';
import { MealplanComponent } from './mealplan/mealplan.component';
import { SharedModule } from 'src/app/shared';
import { MealplanInvoerenComponent } from './mealplan-invoeren/mealplan-invoeren.component';
import { MealplanHomeComponent } from './mealplan-home/mealplan-home.component';
import { ReactiveFormsModule } from '@angular/forms';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [
    MealplanComponent,
    MealplanInvoerenComponent,
    MealplanHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MealplanRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory
    },{
    dateFormatter: {
      provide: CalendarDateFormatter,
      useClass: CalendarMomentDateFormatter
    }
    }
    )
  ],
  providers: [
    {
      provide: MOMENT,
      useValue: moment
    }
  ]
})
export class MealplanModule { }
