import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categorie, Recept, SearchQuery } from 'src/app/shared/models';
import { CategorieService } from './categorie.service';
import { ReceptService } from './recept.service';


@Injectable({
  providedIn: 'root'
})
export class AdvancedSearchService {

  private _searchQuery : SearchQuery = new SearchQuery();
  private _receptenSub$ = new BehaviorSubject<Observable<Recept[]>>(new Observable<Recept[]>());

  constructor(
    private receptService: ReceptService,
    private categorieService: CategorieService
  ) {
   }

  initReceptenLijst(param: ParamMap) {
    let catId = -1;
    if (param.has("catId")) {
      catId = parseInt(param.get("catId") as string);
    }
    let backendQuery = new SearchQuery();
    if (param.has("filter")) {
      backendQuery = this.parseQuery(param);
    }

    this.fillRecepten(backendQuery, catId);
    return this._receptenSub$;
  }

  private fillRecepten(backendQuery: SearchQuery, catId: number) {
    if (backendQuery.isEmpty()) {
      if (catId != -1) {
        this.getReceptenByCategory(catId);
        console.log("categorie found=" + catId);
      } else {
        this.getAllRecepten();
        console.log("nothing found getting all recipes");
      }
    } else {
      console.log("query found!");
      this._receptenSub$.next(this.receptService.searchByQuery(backendQuery));
    }
  }

  private parseQuery(param: ParamMap) {
    let backendQuery = new SearchQuery();
    if (param.has("filter")) {
      let filter = param.get("filter");
      backendQuery.filter = (filter as string == "true");
    }
    if(param.has("q")) {
      let q = param.get("q");
      backendQuery.q = q as string;
    }
    if (param.has("cats")) {
      let cats = param.getAll("cats");
      backendQuery.cats = cats;
    }
    if (param.has("ingr")) {
      let ingr = param.getAll("ingr");
      backendQuery.ingr = ingr;
    }
    if (param.has("maxSer") && param.has("minSer")) {
      backendQuery.minSer = parseInt(param.get("minSer") as string);
      backendQuery.maxSer = parseInt(param.get("maxSer") as string);
    }
    if (param.has("bron")) {
      backendQuery.bron = param.getAll("bron");
    }
    return backendQuery;
  }

  getReceptenByCategory(catId: number) {
    this._receptenSub$.next(this.categorieService.getReceptenByCategory(catId));

  }

  getAllRecepten(): void {
    this._receptenSub$.next(this.receptService.getAllRecepten());
  }

  get receptenSub$() : BehaviorSubject<Observable<Recept[]>> {
    return this._receptenSub$;

  }

  updateQuery(q :string) {
    this._searchQuery.q = q;
  }

  updateFilter(searchQuery : SearchQuery) {
    // console.log(searchQuery)
    if(!searchQuery.q) {
      searchQuery.q = this._searchQuery.q
    }
    searchQuery.filter = true;
    this._receptenSub$.next(this.receptService.searchByQuery(searchQuery));
  }
}
