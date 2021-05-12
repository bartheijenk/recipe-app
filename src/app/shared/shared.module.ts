import { NgModule } from "@angular/core"
import {CommonModule} from '@angular/common'
import { MaterialModule } from "./components/material.module"


// import {

// } from './'

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    providers: [
        
    ],
    declarations: [],
    exports: [
        MaterialModule
    ]
})

export class SharedModule { }