import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ReceptService } from 'src/app/core';
import { Recept } from 'src/app/shared/models';
import { Categorie } from 'src/app/shared/models/categorie';

@Component({
  selector: 'app-recept-detail',
  templateUrl: './recept-detail.component.html',
  styleUrls: ['./recept-detail.component.css']
})
export class ReceptDetailComponent implements OnInit {
  recept: Recept | undefined;
  
  constructor(
    private receptService: ReceptService,
    private route: ActivatedRoute
    ) {
      this.route.paramMap.pipe(
        switchMap((param: ParamMap) =>
        this.receptService.getRecept(param.get('id'))))
        .subscribe(recept => this.recept = recept)
     }

  ngOnInit(): void {   
  }

  getCategories() : Categorie[] | undefined {
    return this.recept?.categories;
  }

}
