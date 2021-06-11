import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Categorie, Recept } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private readonly uri = environment.apiUrl + "categories"

  constructor(
    private http: HttpClient
  ) { }

  getCategorie(arg0: string | null): Observable<Categorie> {
    if (arg0 != null) {
      return this.http.get<Categorie>(this.uri + "/" + arg0);
    }
    return of()
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.uri);
  }

  

  getReceptenByCategory(catId: number): Observable<Recept[]> {
    return this.http.get<Recept[]>(`${this.uri}/${catId}/recepten`);
  }
}
