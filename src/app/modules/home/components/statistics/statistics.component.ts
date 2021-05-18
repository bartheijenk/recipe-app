import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceptService } from 'src/app/core';
import { Recept } from 'src/app/shared/models';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  receptCount$!: Observable<Recept[]>;
  constructor(
    private receptService : ReceptService
  ) { }

  ngOnInit(): void {
    
    this.receptCount$ = this.receptService.getAllRecepten();
  }

}
