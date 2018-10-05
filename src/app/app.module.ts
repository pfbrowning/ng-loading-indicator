import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgLoadingIndicatorModule } from '@browninglogic/ng-loading-indicator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgLoadingIndicatorModule,
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
