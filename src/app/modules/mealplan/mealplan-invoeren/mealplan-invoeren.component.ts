import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  servingsLeft: number = 2;

  constructor(
    private route: ActivatedRoute,
    private mealplanService: MealplanService,
    private formBuilder: FormBuilder
  ) {
    this.addMealplan = this.formBuilder.group({
      recept: [],
      servings: [, [Validators.required,
      (control: AbstractControl) => Validators.max(this.servingsLeft)(control)]],
      date: [moment().toISOString(), Validators.required],
      isAvondeten: [true]
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
    if (!this.addMealplan.invalid || this.servingsLeft <= 0) {
      this.servingsLeft -= this.addMealplan.value.servings;


      let formValues = this.addMealplan.value

      let mealplanRequest = new MealplanRequest();

      mealplanRequest.date = moment(formValues.date).format("yyyy-MM-DD");
      mealplanRequest.isAvondeten = formValues.isAvondeten;
      mealplanRequest.servings = formValues.servings;
      mealplanRequest.recept = this.recept.id;
      this.mealplanService.addMealplanItem(mealplanRequest);
      
      this.addMealplan.controls["servings"].reset();
    }
  }

}
