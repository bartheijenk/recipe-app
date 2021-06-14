import { Component, OnInit } from '@angular/core';
import { RandomizerService } from 'src/app/core';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.css']
})
export class RandomizerComponent implements OnInit {

  constructor(    
    private randomizerService: RandomizerService
  ) { }

  ngOnInit(): void {
  }

}
