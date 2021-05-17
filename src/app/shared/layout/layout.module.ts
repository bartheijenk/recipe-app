import { NgModule } from "@angular/core"
import {CommonModule} from '@angular/common'
import { FooterComponent } from "./footer/footer.component"
import { HeaderComponent } from "./header/header.component"
import { MaterialModule } from "../components/material.module"
import { ReactiveFormsModule } from "@angular/forms";
import { SidenavRoutingComponent } from './sidenav-routing/sidenav-routing.component'
import { RouterModule } from "@angular/router"


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule
    ],
    providers: [],
    declarations: [FooterComponent, HeaderComponent, SidenavRoutingComponent],
    exports: [FooterComponent, HeaderComponent, SidenavRoutingComponent]
})

export class LayoutModule { }