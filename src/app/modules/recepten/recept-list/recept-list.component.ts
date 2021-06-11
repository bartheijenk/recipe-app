import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdvancedSearchService, CategorieService, ReceptService } from 'src/app/core';
import { Categorie, Recept, SearchQuery } from 'src/app/shared/models';

@Component({
  selector: 'app-recept-list',
  templateUrl: './recept-list.component.html',
  styleUrls: ['./recept-list.component.css']
})
export class ReceptListComponent implements OnInit {
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  page$: Observable<Recept[]> | undefined;


  constructor(
    private route: ActivatedRoute,
    private searchService: AdvancedSearchService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      this.searchService.initReceptenLijst(param)
      .subscribe(c => this.updatePage(0, this.pageSize));
         });
  }

  get recepten$(): Observable<Recept[]> {     
    return this.searchService._recepten$;
  }

  change(event: PageEvent) {
    this.updatePage(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

  public updatePage(startIndex: number, endIndex: number) {
    this.page$ = this.recepten$?.pipe(
      map(r => r.slice(startIndex, endIndex))
    );
  }

}
