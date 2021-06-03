import { Component, OnInit } from '@angular/core';
import { ReceptService } from '../../core/';
import { Recept } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { RandomizerService } from 'src/app/core/services/randomizer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hello: Observable<string>;
  random: Observable<Recept[]>;

  constructor(
    private receptService: ReceptService,
    private randomizerService: RandomizerService
    ) {
      this.hello = receptService.getHello();
      this.random = this.randomizerService.getRandomizedList(3);
     }

  ngOnInit(): void {    
  }

}
