import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categorie, Recept, SearchQuery } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  private readonly uri = environment.apiUrl + "randomizer";
  private _receptenSub$ = new BehaviorSubject<Observable<Recept[]>>(new Observable<Recept[]>());

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

  initReceptenLijst(param: ParamMap) {
    let catId = -1;
    if (param.has("catId")) {
      catId = parseInt(param.get("catId") as string);
    }

    // this.fillRecepten(catId);
    return this._receptenSub$;
  }

  get receptenSub$() : BehaviorSubject<Observable<Recept[]>> {
    return this._receptenSub$;
  }
}
