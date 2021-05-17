import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recept } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ReceptService {
  

  private receptUrl = 'http://localhost:3000/recept'
  private _countRecepten = 0;

  constructor(
    private http: HttpClient
  ) { }

  getAllRecepten() : Observable<Recept[]> {
    return this.http.get<Recept[]>(this.receptUrl);

  }

  getRecept(id: string | null): Observable<Recept> {
    return this.http.get<Recept>(`${this.receptUrl}/${id}`);
  }
}
