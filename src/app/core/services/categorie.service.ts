import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Recept } from 'src/app/shared/models';
import { Categorie } from 'src/app/shared/models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost:3000/'

  constructor(
    private http: HttpClient
  ) { }

}
