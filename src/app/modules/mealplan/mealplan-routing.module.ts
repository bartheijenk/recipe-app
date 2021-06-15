import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealplanComponent } from './mealplan/mealplan.component';

const routes: Routes = [
  {path: '', component: MealplanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealplanRoutingModule { }
