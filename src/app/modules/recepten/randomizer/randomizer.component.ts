import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { CategorieService, RandomizerService } from 'src/app/core';
import { Categorie } from 'src/app/shared/models';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.css']
})
export class RandomizerComponent implements OnInit {

  randomizerInput : FormGroup;
  filteredCategories: Observable<Categorie[]>;  
  allCategories: Observable<Categorie[]>;
  addedCategories: Categorie[] = [];
  
  catCtrl: FormControl = new FormControl();

  constructor(    
    private randomizerService: RandomizerService,
    private formBuilder: FormBuilder,
    private categorieService: CategorieService
  ) { 
    this.randomizerInput = this.formBuilder.group({
      limit: 10
    });
  }

  ngOnInit(): void {
    this.initializeCategories()
  }

  public submit() {
    this.randomizerService.updateRecepten(this.randomizerInput.get("limit")?.value as number,
    
    this.addedCategories.map(c => c.id as string))
  }

  private initializeCategories() {
    this.allCategories = this.categorieService.getAllCategories();
    this.filteredCategories = this.catCtrl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(terms => this.filterCategories(terms))
      );
  }
  private filterCategories(value: string): Observable<Categorie[]> {
    const filterValue = value.toLocaleLowerCase();
    return this.allCategories.pipe(
      map(c => c.filter(cat => cat.naam.toLowerCase().includes(filterValue))
      ));

  }

  public addCategorie() {
    let cat: Categorie;
    this.allCategories.pipe(
      map(c => c.find(cat => cat.naam == this.catCtrl.value))
    ).subscribe(
      c => {
        c == null ? cat = { id: "", naam: this.catCtrl.value } : cat = c;
        this.addedCategories.push(cat);
        this.catCtrl.reset();
      }
    );
  }

  public removeAddedCat(cat: Categorie) {
    this.addedCategories = this.addedCategories.filter(c => c.naam != cat.naam);
  }

}
