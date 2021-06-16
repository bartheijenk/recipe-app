import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ReceptService } from 'src/app/core';
import { Categorie, Recept } from 'src/app/shared/models';

@Component({
  selector: 'app-recept-detail',
  templateUrl: './recept-detail.component.html',
  styleUrls: ['./recept-detail.component.css']
})
export class ReceptDetailComponent implements OnInit {
  recept: Recept | undefined;

  constructor(
    private route: ActivatedRoute
  ) {

  }
  public innerWidth: any;
  
  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.recept = response.recept;
    });
  }

  getCategories(): Categorie[] | undefined {
    return this.recept?.categories;
  }
}
