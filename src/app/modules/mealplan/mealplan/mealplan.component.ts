import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MealplanService } from 'src/app/core';
import { MealplanItem } from 'src/app/shared/models';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { colors } from '../color-util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css']
})
export class MealplanComponent implements OnInit {

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  mealplan$: Observable<MealplanItem[]>;
  viewDate: Date = new Date();
  events$: Observable<CalendarEvent<{ item: MealplanItem }>[]>;

  refresh: Subject<any> = new Subject();

  constructor(
    private mealplanService: MealplanService
  ) { }
  ngOnInit(): void {
    this.events$ = this.mealplanService.getAllMealplanItems()
    .pipe(
      map( results => {
        return results.map((item: MealplanItem) => {
          console.log(item.date)
          return {
            title: item.recept.titel,
          start: new Date(item.date),
          color: item.isAvondeten ? colors.yellow : colors.blue,
          allDay: true,
          draggable: true,
          meta: {
            item : item
          }
          };
        });
      } ));

  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    let mealplanItem : MealplanItem = event.meta.item;   
    this.mealplanService.updateDate(mealplanItem, newStart);
    this.refresh.next();
  }

}
