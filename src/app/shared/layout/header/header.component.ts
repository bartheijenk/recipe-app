import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ReceptService } from 'src/app/core';
import { Recept } from '../../models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() toggleSideNav = new EventEmitter();
  recepten : Recept[] = [];
  searchCtrl = new FormControl();
  filteredRecepten : Observable<Recept[]>;


  constructor(private receptService : ReceptService) { 
    this.filteredRecepten = this.searchCtrl.valueChanges
      .pipe(
        startWith(''),
        map(recept => recept ? this._filterRecpeten(recept) : this.recepten.slice())
      );
  }

  ngOnInit(): void {
  }

  toggleSide() {
    this.toggleSideNav.emit();
  }

  loadRecepten() {
    this.receptService.getAllRecepten()
      .subscribe(r => this.recepten = r);
  }

  private _filterRecpeten(value: string) : Recept[] {
    const filterValue = value.toLowerCase();

    return this.recepten.filter(recept => recept.titel.toLowerCase().includes(filterValue))
  }

}
