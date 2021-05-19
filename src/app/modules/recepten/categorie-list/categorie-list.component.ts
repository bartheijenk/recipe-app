import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { Categorie } from 'src/app/shared/models/categorie';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {
  categorie$ : Observable<Categorie[]> | undefined;

  constructor(
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categorie$ = this.categorieService.getAllCategories();
  }

}
