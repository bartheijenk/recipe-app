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
    
  }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
    this.recept = response.recept;
    });
  }

  getCategories(): Categorie[] | undefined {
    return this.recept?.categories;
  }

}
