import { Injectable, Output, EventEmitter } from '@angular/core';


/** Global service used throughout the application to communicate
 * to the loading indicator component when it should show and hide
 * its loading indicator */
@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  /** Event signifying that the load started */
  @Output() eventLoadStarted = new EventEmitter<string>();
  /** Event signifying that the load ended */
  @Output() eventLoadEnded = new EventEmitter();

  /** Notifies the loading indicator component to show a
   * loading indicator with the specified text */
  public showLoadingIndicator(loadingMessage: string = 'Loading') {
    this.eventLoadStarted.emit(loadingMessage);
  }

  /** Notifies the loading indicator component to hide the
   * currently displayed loading indicator */
  public hideLoadingIndicator() {
    this.eventLoadEnded.emit();
  }
}
