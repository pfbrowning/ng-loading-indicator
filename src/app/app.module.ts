import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgLoadingIndicatorModule } from 'ng-loading-indicator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgLoadingIndicatorModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
