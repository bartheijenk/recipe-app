import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recept } from 'src/app/shared/models';
import { ReceptService } from '..';

@Injectable({
  providedIn: 'root'
})
export class ReceptResolver implements Resolve<Recept> {

  constructor(
    private receptService : ReceptService
    ) {}



  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recept> {
    return this.receptService.getRecept(route.paramMap.get('id'));
  }
}
