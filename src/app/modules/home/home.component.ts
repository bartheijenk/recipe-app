import { Component, OnInit } from '@angular/core';
import { ReceptService } from '../../core/';
import { Recept } from 'src/app/shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recepten : Recept[] = [];
  

  constructor(
    private receptService: ReceptService
  ) { }

  ngOnInit(): void {
    this.getRecepten();
    
  }

    getRecepten(): void {
      this.receptService.getAllRecepten()
      .subscribe(r => this.recepten = r);
  }
}
