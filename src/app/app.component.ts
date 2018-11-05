import { Component } from '@angular/core';
import { LoadingIndicatorService } from 'projects/ng-loading-indicator/src/public_api';
import { timer } from 'rxjs';
import { tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private loadingIndicatorService: LoadingIndicatorService) {}

  public applyStyles: boolean;

  public show(): void {
    // Show the loading indicator
    this.loadingIndicatorService.showLoadingIndicator();
    // Simulate a two second API call
    timer(2000)
      /* Hide the loading indicator after the completion of the API call. */
      .pipe(finalize(() => this.loadingIndicatorService.hideLoadingIndicator()))
      .subscribe();
  }

  public showDifferentMessages(): void {
    // Show the loading indicator with custom loading message text
    this.loadingIndicatorService.showLoadingIndicator('Fetching the first thing');
    // Simulate a two second API call
    timer(2000).pipe(
      // Change the loading message text between the first and second simulated API call
      tap(() => this.loadingIndicatorService.showLoadingIndicator('Fetching something else')),
      // Simulate a second two second API call
      switchMap(() => timer(2000)),
      /* Hide the loading indicator upon completion of both of the simulated API
      calls, regardless of whether the operation succeeded or failed. */
      finalize(() => this.loadingIndicatorService.hideLoadingIndicator())
    ).subscribe();
  }
}
