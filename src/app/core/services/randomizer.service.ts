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

  getRandomizedListByCategorie(limit: number, cats: string[]): Observable<Recept[]> {
    if (cats.length > 0) {
      let catIds: string = "";
      cats.forEach(

        c =>
          catIds = catIds.concat("&catIds=" + c)

      );
      console.log(catIds)
      return this.http.get<Recept[]>(this.uri + "?limit=" + limit + catIds);
    }
    else {
      return this.getRandomizedList(limit);
    }
  }

  getRandomizedList(limit: number): Observable<Recept[]> {
    return this.http.get<Recept[]>(this.uri + "?limit=" + limit);
  }

  updateRecepten(limit: number, cats: string[]) {
    this.receptenSub$.next(this.getRandomizedListByCategorie(limit, cats));
  }

  initReceptenLijst(param: ParamMap) {
    let catIds: string[] = [];
    let limit = 10;
    if (param.has("catId")) {
      catIds = param.getAll("catId");
    }

    this.receptenSub$.next(this.getRandomizedListByCategorie(limit, catIds))
    return this._receptenSub$;
  }

  get receptenSub$(): BehaviorSubject<Observable<Recept[]>> {
    return this._receptenSub$;
  }
}
