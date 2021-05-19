import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  recepten$: Observable<Recept[]> | undefined;


  constructor(
    private receptService: ReceptService,
    private categorieService: CategorieService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        let id = param.get("id");
        console.log("catId: " + id);
        return this.categorieService.getCategorie(id);
      }))
      .subscribe(c => this.getReceptenByCategory(c));
  }

  ngOnInit(): void {
    if (this.categorie == undefined) {
      this.getAllRecepten();
    }
    else {
      this.getReceptenByCategory(this.categorie);
    }
  }
  getReceptenByCategory(category: Categorie) {
    console.log("categorie: " + category);
    this.recepten$ = this.receptService.getReceptenByCategory(category);
  }

  getAllRecepten(): void {
    this.recepten$ = this.receptService.getAllRecepten();
  }

}
