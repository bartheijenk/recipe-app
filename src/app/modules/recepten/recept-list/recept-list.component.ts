import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdvancedSearchService, RandomizerService } from 'src/app/core';
import { Recept } from 'src/app/shared/models';

@Component({
  selector: 'app-recept-list',
  templateUrl: './recept-list.component.html',
  styleUrls: ['./recept-list.component.css']
})
export class ReceptListComponent implements OnInit {
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  page$: Observable<Recept[]> | undefined;
  isRandom: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private searchService: AdvancedSearchService,
    private randomizerService: RandomizerService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => this.isRandom = param['rnd'])
    if(this.isRandom) {

      console.log("RANOMD")
    } else {
      this.route.queryParamMap.subscribe((param) => {
        this.searchService.initReceptenLijst(param)
          .subscribe(() => this.updatePage(0, this.pageSize));
      });
    }
    
  }

  get recepten$(): Observable<Recept[]> {
    return this.searchService.receptenSub$.getValue();
  }

  change(event: PageEvent) {
    this.updatePage(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

  public updatePage(startIndex: number, endIndex: number) {
    this.page$ = this.recepten$?.pipe(
      map(r => r.slice(startIndex, endIndex))
    );
  }

}
