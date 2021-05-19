import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Recept } from 'src/app/shared/models';
import { Categorie } from 'src/app/shared/models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  private baseUrl = 'http://localhost:3000/categorie/'

  constructor(
    private http: HttpClient
  ) { }

  getCategorie(arg0: string | null): Observable<Categorie> {
    if (arg0 != null) {
      return this.http.get<Categorie>(this.baseUrl + arg0);
    }
    return of()
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.baseUrl);
  }
}
