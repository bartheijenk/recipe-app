import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MealplanItem, MealplanRequest } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealplanService {
  
  private _mealplanItemsSub$ : BehaviorSubject<Observable<MealplanItem[]>> = new BehaviorSubject<Observable<MealplanItem[]>>(new Observable<MealplanItem[]>());

  private readonly uri = environment.apiUrl + "mealplan"

  constructor(
    private http: HttpClient
  ) {
    this._mealplanItemsSub$ = new BehaviorSubject<Observable<MealplanItem[]>>(new Observable<MealplanItem[]>());
   }

  getAllMealplanItems() {
    this.mealplanItemsSub$.next(this.http.get<MealplanItem[]>(this.uri));    
  }

  updateDate(item : MealplanItem, newDate: Date) {
    item.date = newDate;
    this.http.put<string>(this.uri + "/" + item.id, item).subscribe();
  }

  addMealplanItem(mealplanItem: MealplanRequest) {
    this.http.post<MealplanItem>(this.uri ,mealplanItem).subscribe(() => this.getAllMealplanItems());
  }

  deleteMealPlanItem(mealplanItem: MealplanItem) {
    this.http.delete<MealplanItem>(this.uri  + "/" +  mealplanItem.id).subscribe(() => this.getAllMealplanItems());
  }

  get mealplanItemsSub$() : BehaviorSubject<Observable<MealplanItem[]>>{
    return this._mealplanItemsSub$;
  }

}
