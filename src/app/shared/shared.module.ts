import { NgModule } from "@angular/core"
import {CommonModule} from '@angular/common'
import { MaterialModule } from "./layout/material.module";
import { CategorieTostringPipe } from './pipes/categorie-tostring.pipe'
import { CoreModule } from "../core";
import { NewlinesPipe } from './pipes/newlines.pipe';


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
    CategorieTostringPipe,
    NewlinesPipe
  ],
    exports: [
        MaterialModule,
        CategorieTostringPipe,
        NewlinesPipe,
        CoreModule
    ]
})

export class SharedModule { }