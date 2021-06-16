import { Component, OnInit, ViewChild } from '@angular/core';
import { MealplanComponent } from '../mealplan/mealplan.component';

@Component({
  selector: 'app-mealplan-home',
  templateUrl: './mealplan-home.component.html',
  styleUrls: ['./mealplan-home.component.css']
})
export class MealplanHomeComponent implements OnInit {


  @ViewChild(MealplanComponent)
  private mealplanComponent!: MealplanComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
