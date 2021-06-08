import { Component, HostListener, OnInit } from '@angular/core';
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
  colspanIngr = 1;
  colspanInst = 3;
  cols = 4;
  rowHeight = "1:5";

  constructor(
    private receptService: ReceptService,
    private route: ActivatedRoute
  ) {

  }
  public innerWidth: any;
  
  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.recept = response.recept;
      this.editcolspan();
    });
  }

  getCategories(): Categorie[] | undefined {
    return this.recept?.categories;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    this.editcolspan();
  }


  private editcolspan() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 600) {
      this.colspanIngr = 1;
      this.colspanInst = 1;
      this.cols = 1;
      this.rowHeight = "200px";
      
    } else {
      this.colspanIngr = 1;
      this.colspanInst = 3;
      this.cols = 4;
      this.rowHeight = "800px";
    }
  }
}
