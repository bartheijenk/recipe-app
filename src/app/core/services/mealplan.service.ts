import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
