import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-routing',
  templateUrl: './sidenav-routing.component.html',
  styleUrls: ['./sidenav-routing.component.css']
})
export class SidenavRoutingComponent implements OnInit {
  links = [
    {name: "Home", path: "", icon: "home"},
    {name: "Lijsten", path: "receptenlijst", icon: "list"},
]

  constructor() { }

  ngOnInit(): void {
  }

}
