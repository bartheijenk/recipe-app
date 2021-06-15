import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module'
import { LayoutModule } from './shared/layout/layout.module';
import { SharedModule } from './shared';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { DateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CoreModule,
    LayoutModule,
    SharedModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
