import { Component, OnInit } from '@angular/core';
import { ReceptService } from 'src/app/core';
import { Recept } from 'src/app/shared/models';

@Component({
  selector: 'app-recept-list',
  templateUrl: './recept-list.component.html',
  styleUrls: ['./recept-list.component.css']
})
export class ReceptListComponent implements OnInit {

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
