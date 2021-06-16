import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptResolver } from 'src/app/core/resolvers';
import { MealplanHomeComponent } from './mealplan-home/mealplan-home.component';
import { MealplanInvoerenComponent } from './mealplan-invoeren/mealplan-invoeren.component';
import { MealplanComponent } from './mealplan/mealplan.component';

const routes: Routes = [
  {path: '', component: MealplanHomeComponent, children: [
    {path: 'invoer/:id', component: MealplanInvoerenComponent, resolve: {
      recept: ReceptResolver
    }},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealplanRoutingModule { }
