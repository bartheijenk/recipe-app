import { Component, OnInit } from '@angular/core';
import { AdvancedSearchService } from 'src/app/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  constructor(
    private searchService: AdvancedSearchService
  ) { }

  ngOnInit(): void {
  }

  updateFilters() {
    
  }
}
