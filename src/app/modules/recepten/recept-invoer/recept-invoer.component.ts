import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceptService } from 'src/app/core';
import { Recept } from 'src/app/shared/models';

@Component({
  selector: 'app-recept-invoer',
  templateUrl: './recept-invoer.component.html',
  styleUrls: ['./recept-invoer.component.css']
})
export class ReceptInvoerComponent implements OnInit {

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

}
