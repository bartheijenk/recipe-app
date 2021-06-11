import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie, Recept } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  private readonly uri = environment.apiUrl + "randomizer";

  constructor(
    private http: HttpClient
  ) { }

  getRandomizedListByCategorie(limit : number, cats : Categorie[]) : Observable<Recept[]> {
    let catIds : string = "";
    cats.forEach(
      c => catIds.concat("&catIds="+ c.id)
    );
    return this.http.get<Recept[]>(this.uri + "?limit=" + limit + catIds);
  }

  getRandomizedList(limit : number) : Observable<Recept[]> {
    return this.http.get<Recept[]>(this.uri + "?limit=" + limit);
  }
}
