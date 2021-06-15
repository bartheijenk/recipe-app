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

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [
    MealplanComponent
  ],
  imports: [
    CommonModule,
    MealplanRoutingModule,
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
