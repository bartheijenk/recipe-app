import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list-home',
  templateUrl: './list-home.component.html',
  styleUrls: ['./list-home.component.css']
})
export class ListHomeComponent implements OnInit {
  isViewInitialized = false;
  links = [
    {name: "Alles", path: "lijst"},
    {name: "Per categorie", path: "catlijst"}
  ];
  activeLink = this.links[0].path;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;    
    this.changeDetector.detectChanges();
  }

  isLinkActive(rla: RouterLinkActive): boolean {
    const routerLink = rla.linksWithHrefs.first;
    
    return this.router.isActive(routerLink.urlTree, false);
  }
}
