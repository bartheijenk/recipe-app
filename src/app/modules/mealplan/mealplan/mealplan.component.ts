import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MealplanService } from 'src/app/core';
import { MealplanItem } from 'src/app/shared/models';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { ThemePalette } from '@angular/material/core';


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

  activeDayIsOpen: boolean = true;

  constructor(
    private mealplanService: MealplanService
  ) {

  }

  ngOnInit(): void {
    this.mealplanService.getAllMealplanItems();
    this.mealplanService.mealplanItemsSub$.subscribe(() => this.loadEvents())
  }

  private loadEvents() {
    let mealplan = this.mealplanService.mealplanItemsSub$.getValue();
    this.events$ = mealplan
      .pipe(
        map(results => {
          return results.map((item: MealplanItem) => {
            return {
              title: item.recept.titel,
              start: new Date(item.date),
              colour: item.isAvondeten ? "primary" : "accent",
              allDay: true,
              draggable: true,
              meta: {
                item: item
              },
              actions: [
                this.deleteEvent(),
                  ]
            };
          });
        }));
  }

  private deleteEvent(): { label: string; a11yLabel: string; onClick: ({ event }: { event: CalendarEvent; }) => void; } {
    return {
      label: "<span class='material-icons-outlined '>delete</span>",
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent; }): void => {
        this.mealplanService.deleteMealPlanItem(event.meta.item);
      }
    };
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    let mealplanItem: MealplanItem = event.meta.item;
    this.mealplanService.updateDate(mealplanItem, newStart);
    this.refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (date.getMonth() == this.viewDate.getMonth()) {
      if (
        (this.viewDate.getDay() == date.getDay() && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

}
