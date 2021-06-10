import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Recept } from 'src/app/shared/models';
import { Categorie } from 'src/app/shared/models/categorie';
import { SearchQuery } from 'src/app/shared/models/searchQuery';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReceptService {
  
  
  

  constructor(
    private http: HttpClient
  ) { }

  getHello() : Observable<string> {
    return this.http.get<string>("http://localhost:9080/receptweb/api/hello-world");
  }

  private readonly uri = environment.apiUrl + "recepten";

  getAllRecepten(): Observable<Recept[]> {
    return this.http.get<Recept[]>(this.uri);
  }

  getRecept(id: string | null): Observable<Recept> {
    return this.http.get<Recept>(`${this.uri}/${id}`);
  }

  searchRecept(searchTerms: string) : Observable<Recept[]> {
    return this.http.get<Recept[]>(`${this.uri}?q=${searchTerms}`);
  }

  saveRecept(recept: Recept) {
    return this.http.post<Recept>(this.uri, recept);
  }
  
  searchByQuery(backendQuery: SearchQuery): Observable<Recept[]> {
    console.log(this.uri + backendQuery.createQueryAsString());
    return this.http.get<Recept[]>(this.uri + backendQuery.createQueryAsString())
  }
}
