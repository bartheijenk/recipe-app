import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MealplanService } from 'src/app/core';
import { MealplanItem, MealplanRequest, Recept } from 'src/app/shared/models';
import * as moment from 'moment'

@Component({
  selector: 'app-mealplan-invoeren',
  templateUrl: './mealplan-invoeren.component.html',
  styleUrls: ['./mealplan-invoeren.component.css']
})
export class MealplanInvoerenComponent implements OnInit {


  addMealplan: FormGroup;

  recept: Recept;
  mealplanItem: MealplanItem;
  servingsLeft: number;

  constructor(
    private route: ActivatedRoute,
    private mealplanService: MealplanService,
    private formBuilder: FormBuilder
  ) {
    this.addMealplan = this.formBuilder.group({
      recept: [],
      servings: [2, [Validators.required, Validators.max(this.servingsLeft)]],
      date: [moment().toISOString(), Validators.required],
      isAvondeten: [true, Validators.required]
    })
  }

  ngOnInit(): void {
    this.mealplanItem = new MealplanItem();
    this.route.data.subscribe((response: any) => {
      this.recept = response.recept;
      this.mealplanItem.recept = this.recept;
      this.addMealplan.controls["recept"].setValue(this.recept.titel);
      this.addMealplan.controls["recept"].disable()
      this.servingsLeft = this.recept.servings;
    });

    this.mealplanService.getAllMealplanItems();
  }

  onSubmit() {
    this.servingsLeft -= this.addMealplan.value.servings;
    

    let formValues = this.addMealplan.value

    let mealplanRequest = new MealplanRequest();

    mealplanRequest.date = moment(formValues.date).format("yyyy-MM-DD");
    mealplanRequest.isAvondeten = formValues.isAvondeten;
    mealplanRequest.servings = formValues.servings;
    mealplanRequest.recept = this.recept.id;
    this.mealplanService.addMealplanItem(mealplanRequest);
    
  }

}
