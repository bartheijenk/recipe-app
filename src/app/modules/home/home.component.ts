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
  hello: Observable<string>;

  constructor(
    private receptService: ReceptService
    ) {
      this.hello = receptService.getHello();
     }

  ngOnInit(): void {    
  }

}
