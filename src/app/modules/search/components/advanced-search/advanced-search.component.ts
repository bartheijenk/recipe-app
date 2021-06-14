import { Component, OnInit } from '@angular/core';
import { AdvancedSearchService, IngredientService } from 'src/app/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  queryString: string;

  constructor(
    private searchService: AdvancedSearchService,
    private ingredientenService: IngredientService
  ) { }

  ngOnInit(): void {
  }

  updateQuery() {
    this.searchService.updateQuery(this.queryString);
  }

  getAllBronnen() {

  }
}
