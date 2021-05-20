import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ReceptService } from 'src/app/core';
import { Recept } from '../../models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideNav = new EventEmitter();
  searchCtrl = new FormControl();
  filteredRecepten$: Observable<Recept[]> | undefined;


  constructor(private receptService: ReceptService) {
    this.filteredRecepten$ =
      this.searchCtrl.valueChanges
        .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(terms => this.searchRecept(terms))
        );
  }

  ngOnInit(): void {
  }

  toggleSide() {
    this.toggleSideNav.emit();
  }

  private searchRecept(searchTerms: string) {
    return this.receptService.searchRecept(searchTerms);

  }

}
