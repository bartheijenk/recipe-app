import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';



@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule
    ]
})
export class MaterialModule { }