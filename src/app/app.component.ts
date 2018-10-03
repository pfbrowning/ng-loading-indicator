import { Component } from '@angular/core';
import { LoadingIndicatorService} from 'ng-loading-indicator'
import { timer } from 'rxjs';

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
    // Hide the loading indicator after two seconds
    timer(2000).subscribe(() => this.loadingIndicatorService.hideLoadingIndicator());
  }
}
