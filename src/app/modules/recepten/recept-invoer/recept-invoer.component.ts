import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { CategorieService, ReceptService } from 'src/app/core';
import { Categorie, Recept, ReceptIngredient } from 'src/app/shared/models';

@Component({
  selector: 'app-recept-invoer',
  templateUrl: './recept-invoer.component.html',
  styleUrls: ['./recept-invoer.component.css']
})
export class ReceptInvoerComponent implements OnInit {

  recept: Recept;
  metaDataFormGroup: FormGroup;
  categorieFormGroup: FormGroup;
  ingredientenFormGroup: FormGroup;
  instructieFormGroup: FormGroup;
  catCtrl: FormControl = new FormControl();

  filteredCategories: Observable<Categorie[]>;
  allCategories: Observable<Categorie[]>;

  addedCategories: Categorie[] = [];
  addedIngredients: ReceptIngredient[] = [];

  message$: Observable<string>;

  ingredientRegex = /^\d+(\.\d+)? .*$/m;

  constructor(
    private receptService: ReceptService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categorieService: CategorieService,
    private snackBar: MatSnackBar
  ) {
    this.initializeFormGroups();
    this.initializeCategories();
  }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.recept = response.recept;
    });
  }

  public submit() {
    this.recept = new Recept();
    this.recept.titel = this.metaDataFormGroup.get("titel")?.value;
    this.recept.servings = this.metaDataFormGroup.get("servings")?.value;
    this.recept.bron = this.metaDataFormGroup.get("servings")?.value == "" ? null : this.metaDataFormGroup.get("servings")?.value

    this.recept.categories = this.addedCategories;


    this.fillIngredienten();
    this.recept.ingredienten = this.addedIngredients;

    this.recept.instructies = this.instructieFormGroup.get("instructies")?.value;

    this.receptService.saveRecept(this.recept).subscribe(
      r => {
        this.snackBar.open("Recept opgeslagen met id: " + r.id, undefined, { duration: 3000 });
        this.initializeFormGroups();
      });
  }

  public fillIngredienten() {
    this.addedIngredients = [];
    try {
      let ingredientSplit = (this.ingredientenFormGroup.get("ingredienten")?.value as string).split(/\n/);

      ingredientSplit.forEach(ing => {
        let ingredient = this.split(ing, " ", 2);
        let ingredientEnInstructie = ingredient[2].split(',');
        let receptIngredient: ReceptIngredient = {
          id: null,
          hoeveelheid: parseInt(ingredient[0]),
          eenheid: ingredient[1].trim(),
          instructie: ingredientEnInstructie.length >= 2 ? ingredientEnInstructie[1].trim() : "",
          ingredient: {
            calorienPerHonderd: "",
            naam: ingredientEnInstructie[0],
            id: "",
            isRecept: null
          }
        };
        
        this.addedIngredients.push(receptIngredient);
      });
      this.message$ = of("Everything is correct!")
    } catch(error) {
      this.message$ = of("Ingredients are not entered correctly!");
    }
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

  private initializeFormGroups() {
    this.metaDataFormGroup = this.formBuilder.group({
      titel: ['', Validators.required],
      servings: ['', Validators.required],
      bron: ['']
    });

    this.categorieFormGroup = this.formBuilder.group({
      categorie: ['']
    });

    this.ingredientenFormGroup = this.formBuilder.group({
      ingredienten: ['', Validators.pattern(this.ingredientRegex)]
    });

    this.instructieFormGroup = this.formBuilder.group({
      instructies: ['']
    });

    this.addedCategories = [];
    this.addedIngredients = [];
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
        if(!this.addedCategories.includes(cat))
          this.addedCategories.push(cat)
        
        this.catCtrl.reset();
      }
    );
  }

  public removeAddedCat(cat: Categorie) {
    this.addedCategories = this.addedCategories.filter(c => c.naam != cat.naam);
  }

  private split(str: string, sep: string, limit: number) {
    let split = str.split(sep);
    if (split.length > limit) {
      let ret = split.splice(0, limit);
      ret.push(split.join(sep));
      return ret;
    }
    return split;
  }

}
