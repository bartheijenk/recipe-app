import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR } from '@angular/material/button-toggle';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AdvancedSearchService, CategorieService, IngredientService, ReceptService } from 'src/app/core';
import { Categorie, Recept, SearchQuery } from 'src/app/shared/models';

@Component({
  selector: 'app-recept-filters',
  templateUrl: './recept-filters.component.html',
  styleUrls: ['./recept-filters.component.css']
})
export class ReceptFiltersComponent implements OnInit {
  filter: FormGroup;
  private _catMap: Array<string> = [];
  private _ingrMap: Array<string> = [];
  maxServings: number = 30;
  minServings: number = 0;
  catPanelOpenState = false;
  serPanelOpenState = false;
  ingrPanelOpenState = false;
  bronPanelOpenState = false;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: AdvancedSearchService,
    private categorieService: CategorieService,
    private ingredientService: IngredientService
  ) {
    this.initFilterForm();
    this.initIngredientenFilters();
    this.initCategorieFilters();
  }

  ngOnInit() {
    this.initReceptenSubject();
  }

  private initReceptenSubject() {
    this.searchService.receptenSub$.subscribe(recepten$ => {
      recepten$.subscribe(recepten => {
        let { currentCategories, currentIngredients }: { currentCategories: string[]; currentIngredients: string[]; } = this.fillCurrentArrays(recepten);
        ({ currentCategories, currentIngredients } = this.filterArrays(currentCategories, currentIngredients));
        this.subscribeForControlDisable(currentCategories, currentIngredients);
      });
    });
  }

  private fillCurrentArrays(recepten: Recept[]) {
    let currentCategories: Array<string> = [];
    let currentIngredients: Array<string> = [];
    recepten.forEach(r => {
      r.ingredienten.forEach(i => {
        currentIngredients.push(i.ingredient.id);
      });
      r.categories.forEach(c => {
        currentCategories.push(c.id);
      });
    });
    return { currentCategories, currentIngredients };
  }

  private filterArrays(currentCategories: string[], currentIngredients: string[]) {
    currentCategories = this._catMap.filter(c => !currentCategories.includes(c));
    currentIngredients = this._ingrMap.filter(i => !currentIngredients.includes(i));
    return { currentCategories, currentIngredients };
  }

  private subscribeForControlDisable(currentCategories: string[], currentIngredients: string[]) {
    (this.categories.controls as Array<FormGroup>).forEach(
      f => {
        if (currentCategories.includes(f.value.id)) {
          f.disable({ emitEvent: false });
        } else {
          f.enable({ emitEvent: false });
        }
      });
    (this.ingredienten.controls as Array<FormGroup>).forEach(f => {
      if (currentIngredients.includes(f.value.id)) {
        f.disable({ emitEvent: false });
      } else {
        f.enable({ emitEvent: false });
      }
    });
  }

  private initFilterForm() {
    this.filter = this.formBuilder.group({
      maxSer: [this.maxServings],
      minSer: [this.minServings],
      categories: this.formBuilder.array([]),
      ingredienten: this.formBuilder.array([]),
      bronnen: this.formBuilder.array([])
    });
  }

  private initCategorieFilters() {
    this.categorieService.getAllCategories().subscribe(cats => {
      cats.forEach(cat => {
        if (!this._catMap.includes(cat.id))
          this._catMap.push(cat.id);
        const group = this.formBuilder.group({
          id: cat.id,
          naam: cat.naam,
          waarde: false
        });
        this.categories.push(group);
        group.valueChanges.pipe(
          debounceTime(20)
        ).subscribe(() => {
          this.updateFilters();
        });
      });
    });
  }

  private initIngredientenFilters() {
    this.ingredientService.getAllIngredients().subscribe(ingrs => {
      ingrs.forEach(ingr => {
        if (!this._ingrMap.includes(ingr.id))
          this._ingrMap.push(ingr.id);
        const group = this.formBuilder.group({
          id: ingr.id,
          naam: ingr.naam,
          waarde: false
        });
        this.ingredienten.push(group);
        group.valueChanges.pipe(
          debounceTime(20)
        ).subscribe(() => {
          this.updateFilters();
        });
      });
    });
  }

  updateFilters() {
    let query = new SearchQuery();
    query.cats = (this.categories.value as Array<any>)
      .filter(c => c.waarde)
      .map(c => c.id);

    query.ingr = (this.ingredienten.value as Array<any>)
      .filter(i => i.waarde)
      .map(i => i.id);

    query.minSer = this.filter.value.minSer;
    query.maxSer = this.filter.value.maxSer;

    this.searchService.updateFilter(query);
  }

  get categories(): FormArray {
    return this.filter.controls["categories"] as FormArray;
  }

  get ingredienten(): FormArray {
    return this.filter.controls["ingredienten"] as FormArray;
  }

  getIngredientFormGroup(i: number) {
    return this.ingredienten.at(i) as FormGroup
  }

  getCategoryFormGroup(i: number) {
    return this.categories.at(i) as FormGroup
  }

  getCategoryFormControl(i: number) {
    return this.getCategoryFormGroup(i).get("waarde") as FormControl;
  }


}
