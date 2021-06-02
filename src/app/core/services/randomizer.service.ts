import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recept } from 'src/app/shared/models';
import { Categorie } from 'src/app/shared/models/categorie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  constructor(
    private http: HttpClient
  ) { }

  getRandomizedListByCategorie(limit : number, cats : Categorie[]) : Observable<Recept[]> {
    let catIds : string = "";
    cats.forEach(
      c => catIds.concat("&catIds="+ c.id)
    );
    return this.http.get<Recept[]>(environment.apiUrl + 
      "randomizer?limit=" + limit + catIds);
  }

  getRandomizedList(limit : number) : Observable<Recept[]> {
    return this.http.get<Recept[]>(environment.apiUrl + "randomizer?limit=" + limit);
  }
}
