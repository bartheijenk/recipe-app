import { NgModule } from "@angular/core"
import {CommonModule} from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ReceptService } from "./services"

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        ReceptService
    ],
    declarations: [],
    exports: [
    ]
})

export class CoreModule { }