import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ReceptService } from 'src/app/core';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { Recept } from 'src/app/shared/models';
import { Categorie } from 'src/app/shared/models/categorie';

@Component({
  selector: 'app-recept-list',
  templateUrl: './recept-list.component.html',
  styleUrls: ['./recept-list.component.css']
})
export class ReceptListComponent implements OnInit {
  categorie: Categorie | undefined;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  recepten$: Observable<Recept[]> | undefined;
  page$: Observable<Recept[]> | undefined;


  constructor(
    private receptService: ReceptService,
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        let id = param.get("id");
        let cat = this.categorieService.getCategorie(id);
        if (id == null) {
          this.getAllRecepten();
        } else {
          this.getReceptenByCategory(cat);
        }
        return cat;
      }))
      .subscribe(c => this.categorie = c);
  }

  private updatePage(startIndex: number, endIndex: number) {
    this.page$ = this.recepten$?.pipe(
      map(r => r.slice(startIndex, endIndex))
    );
  }

  ngOnInit(): void {

  }

  getReceptenByCategory(category: Observable<Categorie>) {
    category.subscribe(c => {
      this.recepten$ = this.categorieService.getReceptenByCategory(c);
      this.updatePage(0, this.pageSize);
    })
    // this.recepten$ = this.receptService.getReceptenByCategory(category);
  }

  getAllRecepten(): void {
    this.recepten$ = this.receptService.getAllRecepten();
    this.updatePage(0, this.pageSize);
  }

  change(event: PageEvent) {
    this.updatePage(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

}
