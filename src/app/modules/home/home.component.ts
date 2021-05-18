import { Component, OnInit } from '@angular/core';
import { ReceptService } from '../../core/';
import { Recept } from 'src/app/shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  constructor(
    private receptService: ReceptService
    ) { }

  ngOnInit(): void {    
  }

}
