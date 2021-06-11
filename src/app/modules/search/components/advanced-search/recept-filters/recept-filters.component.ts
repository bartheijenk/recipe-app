import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AdvancedSearchService, CategorieService, ReceptService } from 'src/app/core';
import { Categorie, Recept, SearchQuery } from 'src/app/shared/models';

@Component({
  selector: 'app-recept-filters',
  templateUrl: './recept-filters.component.html',
  styleUrls: ['./recept-filters.component.css']
})
export class ReceptFiltersComponent implements OnInit {
  filter: FormGroup;
  private _catMap: Array<string> = [];
  maxServings :number = 30;
  minServings :number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: AdvancedSearchService,
    private categorieService: CategorieService
  ) {

    this.filter = this.formBuilder.group({
      maxSer: [this.maxServings],
      minSer: [this.minServings],
      categories: this.formBuilder.array([]),
      
    });

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
          this.updateFilters()
        })
      })
    })

  }
  ngOnInit() {   

    this.initReceptenSubject();
  }

  private initReceptenSubject() {
    this.searchService.receptenSub$.subscribe(recepten$ => {
      recepten$.subscribe(recepten => {
        let currentCategories: Array<string> = [];
        recepten.forEach(r => {

          r.categories.forEach(c => {
            currentCategories.push(c.id);
          });
        });
        currentCategories = this._catMap.filter(c => !currentCategories.includes(c));
        console.log(currentCategories);
        (this.categories.controls as Array<FormGroup>).forEach(
          f => {
            if (currentCategories.includes(f.value.id)) {
              f.disable({ emitEvent: false });
            } else {
              f.enable({ emitEvent: false });
            }
          });
      });
    });
  }

  updateFilters() {
    let query = new SearchQuery();
    query.cats = (this.categories.value as Array<any>)
      .filter(c => c.waarde)
      .map(c => c.id);

      query.minSer = this.filter.value.minSer;
      query.maxSer = this.filter.value.maxSer;

    this.searchService.updateFilter(query);
  }

  get categories(): FormArray {
    return this.filter.controls["categories"] as FormArray;
  }  


  getCategoryFormGroup(i: number) {
    return this.categories.at(i) as FormGroup
  }

  getCategoryFormControl(i: number) {
    return this.getCategoryFormGroup(i).get("waarde") as FormControl;
  }
}
