import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
 

  private readonly uri = environment.apiUrl + "ingredienten"

  constructor(
    private http: HttpClient
  ) { }

  getAllIngredients() : Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.uri);
  }
}
