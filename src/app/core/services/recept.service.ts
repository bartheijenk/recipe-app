import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Recept } from 'src/app/shared/models';
import { Categorie } from 'src/app/shared/models/categorie';

@Injectable({
  providedIn: 'root'
})
export class ReceptService {
  
  private receptUrl = 'http://localhost:3000/recept'

  constructor(
    private http: HttpClient
  ) { }

  getAllRecepten(): Observable<Recept[]> {
    return this.http.get<Recept[]>(this.receptUrl);

  }

  getRecept(id: string | null): Observable<Recept> {
    return this.http.get<Recept>(`${this.receptUrl}/${id}`);
  }

  searchRecept(searchTerms: string) : Observable<Recept[]> {
    return this.http.get<Recept[]>(`${this.receptUrl}?titel_like=${searchTerms}`)
  }

  getReceptenByCategory(category: Categorie): Observable<Recept[]> {
    //TODO change into correct REST call
    let output = this.getAllRecepten().pipe(
      map(r =>
        r = r.filter(recept => {
          if(recept.categories.find(c => c.id == category.id) != undefined) {
            return true;
          } else {
            return false;
          }
        })
      ));
    return output;
  }
}
