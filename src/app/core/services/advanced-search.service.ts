import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Categorie, Recept, SearchQuery } from 'src/app/shared/models';
import { CategorieService } from './categorie.service';
import { ReceptService } from './recept.service';


@Injectable({
  providedIn: 'root'
})
export class AdvancedSearchService {
  

  public _recepten$ : Observable<Recept[]>;

  constructor(
    private receptService: ReceptService,
    private categorieService: CategorieService
  ) { }

  initReceptenLijst(param: ParamMap) {    
    this._recepten$ = new Observable<Recept[]>();
    let catId = 0;
    if (param.has("catId")) {
      catId = parseInt(param.get("catId") as string);
    }
    let backendQuery = new SearchQuery();
    if (param.has("filter")) {
      backendQuery = this.parseQuery(param);
    }

    this.fillRecepten(backendQuery, param, catId);
    return this._recepten$;
  }

  private fillRecepten(backendQuery: SearchQuery, param: ParamMap, catId : number) {
    if (backendQuery.isEmpty()) {
      if (param.has("catId")) {
        this.getReceptenByCategory(catId);
        console.log("categorie found=" + param.get("catId"));
      } else {
        this.getAllRecepten();
        console.log("nothing found getting all recipes");
      }
    } else {
      console.log("query found!");
      this._recepten$ = this.receptService.searchByQuery(backendQuery);
    }
  }
  
  private parseQuery(param: ParamMap) {
    let backendQuery = new SearchQuery();
    if (param.has("filter")) {
      let filter = param.get("filter");
      backendQuery.filter = (filter as string == "true");
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

  getReceptenByCategory(catId : number) {    
      this._recepten$ = this.categorieService.getReceptenByCategory(catId);      
    
  }

  getAllRecepten(): void {
    this._recepten$ = this.receptService.getAllRecepten();
  }

  // get recepten$() : Observable<Recept[]> {
  //   return this._recepten$ as Observable<Recept[]>;

  // }
}
