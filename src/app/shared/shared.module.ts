import { NgModule } from "@angular/core"
import {CommonModule} from '@angular/common'
import { MaterialModule } from "./components/material.module";
import { CategorieTostringPipe } from './pipes/categorie-tostring.pipe'
import { CoreModule } from "../core";


// import {

// } from './'

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CoreModule
    ],
    providers: [
        
    ],
    declarations: [
    CategorieTostringPipe
  ],
    exports: [
        MaterialModule,
        CategorieTostringPipe,
        CoreModule
    ]
})

export class SharedModule { }