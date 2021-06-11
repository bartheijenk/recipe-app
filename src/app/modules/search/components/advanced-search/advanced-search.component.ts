import { Component, OnInit } from '@angular/core';
import { AdvancedSearchService } from 'src/app/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  queryString: string;

  constructor(
    private searchService: AdvancedSearchService
  ) { }

  ngOnInit(): void {
  }

  updateQuery() {
    this.searchService.updateQuery(this.queryString);
  }
}
