import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-routing',
  templateUrl: './sidenav-routing.component.html',
  styleUrls: ['./sidenav-routing.component.css']
})
export class SidenavRoutingComponent implements OnInit {
  links = [
    { name: "Home", path: "", param: null, icon: "home" },
    { name: "Lijsten", path: "recepten/lijst", param: null, icon: "list" },
    { name: "Recept Invoeren", path: "invoer", param: null, icon: "create"},
    { name: "Search", path: "search/results", param:null, icon: "search"},
    { name: "Randomizer", path: "/recepten/randomizer/list", param: {rnd: true}, icon: "shuffle"},
    { name: "Mealplan", path: "mealplan", param: null, icon: "edit_calendar"}
  ];

  
  @Output() toggleSideNav = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSide() {
    this.toggleSideNav.emit();
  }

}
