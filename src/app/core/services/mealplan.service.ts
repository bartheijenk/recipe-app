import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { MealplanItem } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealplanService {

  private readonly uri = environment.apiUrl + "mealplan"

  constructor(
    private http: HttpClient
  ) { }

  getAllMealplanItems() : Observable<MealplanItem[]> {
    return this.http.get<MealplanItem[]>(this.uri);    
  }

  updateDate(item : MealplanItem, newDate: Date) {
    item.date = newDate;
    this.http.put<string>(this.uri + "/" + item.id, item).subscribe();
  }
}
