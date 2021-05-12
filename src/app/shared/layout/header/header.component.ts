import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() toggleSideNav = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSide() {
    this.toggleSideNav.emit();
  }

}
