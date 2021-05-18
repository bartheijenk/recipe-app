import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceptService } from 'src/app/core';
import { Recept } from 'src/app/shared/models';
import { Categorie } from 'src/app/shared/models/categorie';

@Component({
  selector: 'app-recept-list',
  templateUrl: './recept-list.component.html',
  styleUrls: ['./recept-list.component.css']
})
export class ReceptListComponent implements OnInit {
  @Input() category: Categorie | undefined
  // category = { id: "4", naam: "Ontbijt" };

  recepten$: Observable<Recept[]> | undefined;


  constructor(
    private receptService: ReceptService
  ) { }

  ngOnInit(): void {
    if (this.category == undefined) {
      this.getAllRecepten();
    }
    else {
      this.getReceptenByCategory(this.category);
    }
  }
  getReceptenByCategory(category: Categorie) {
    this.recepten$ = this.receptService.getReceptenByCategory(category);
  }

  getAllRecepten(): void {
    this.recepten$ = this.receptService.getAllRecepten();
  }

}
