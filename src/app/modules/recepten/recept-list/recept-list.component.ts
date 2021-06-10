import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ReceptService } from 'src/app/core';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { Recept } from 'src/app/shared/models';
import { Categorie } from 'src/app/shared/models/categorie';
import { SearchQuery } from 'src/app/shared/models/searchQuery';

@Component({
  selector: 'app-recept-list',
  templateUrl: './recept-list.component.html',
  styleUrls: ['./recept-list.component.css']
})
export class ReceptListComponent implements OnInit {
  categorie$: Observable<Categorie>;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  recepten$: Observable<Recept[]> | undefined;
  page$: Observable<Recept[]> | undefined;


  constructor(
    private receptService: ReceptService,
    private categorieService: CategorieService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((param) => {
      if (param.has("catId")) {
        this.categorie$ = this.categorieService.getCategorie(param.get("catId"));
      }
      let backendQuery = new SearchQuery();
      if (param.has("filter")) {
        backendQuery = this.parseQuery(param);
      }

      this.fillRecepten(backendQuery, param);
    });
  }

  ngOnInit(): void {

  }

  private fillRecepten(backendQuery: SearchQuery, param: ParamMap) {
    if (backendQuery.isEmpty()) {
      if (param.has("catId")) {
        this.getReceptenByCategory(this.categorie$);
        console.log("categorie found");
      } else {
        this.getAllRecepten();
        console.log("nothing found getting all recipes");
      }
    } else {
      console.log("query found!");
      this.recepten$ = this.receptService.searchByQuery(backendQuery);
      this.updatePage(0, this.pageSize);
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

 

  

  getReceptenByCategory(category: Observable<Categorie>) {
    category.subscribe(c => {
      this.recepten$ = this.categorieService.getReceptenByCategory(c);
      this.updatePage(0, this.pageSize);
    })
  }

  getAllRecepten(): void {
    this.recepten$ = this.receptService.getAllRecepten();
    this.updatePage(0, this.pageSize);
  }

  change(event: PageEvent) {
    this.updatePage(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

  private updatePage(startIndex: number, endIndex: number) {
    this.page$ = this.recepten$?.pipe(
      map(r => r.slice(startIndex, endIndex))
    );
  }

}
