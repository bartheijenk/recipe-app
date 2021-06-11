import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-routing',
  templateUrl: './sidenav-routing.component.html',
  styleUrls: ['./sidenav-routing.component.css']
})
export class SidenavRoutingComponent implements OnInit {
  links = [
    { name: "Home", path: "", icon: "home" },
    { name: "Lijsten", path: "recepten/lijst", icon: "list" },
    { name: "Recept Invoeren", path: "invoer", icon: "create"},
    { name: "Search", path: "search/results", icon: "search"}
  ];

  
  @Output() toggleSideNav = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSide() {
    this.toggleSideNav.emit();
  }

}
