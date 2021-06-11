import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from 'src/app/shared';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { ReceptFiltersComponent } from './components/advanced-search/recept-filters/recept-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdvancedSearchComponent,
    ReceptFiltersComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SearchModule { }
