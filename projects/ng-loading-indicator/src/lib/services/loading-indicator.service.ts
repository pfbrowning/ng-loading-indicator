import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


/** Global service used throughout the application to communicate
 * to the loading indicator component when it should show and hide
 * its loading indicator */
@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  private loading = new BehaviorSubject<boolean>(false);
  private loadingMessage: string;

  /** Notifies the loading indicator component to show a
   * loading indicator with the specified text */
  public showLoadingIndicator(loadingMessage: string = 'Loading') {
    this.loadingMessage = loadingMessage;
    this.loading.next(true);
  }

  /** Notifies the loading indicator component to hide the
   * currently displayed loading indicator */
  public hideLoadingIndicator() {
    this.loadingMessage = null;
    this.loading.next(false);
  }

  public get loadStarted(): Observable<string> {
    return this.loading.pipe(
      filter(loading => loading === true),
      map(() => this.loadingMessage)
    );
  }

  public get loadEnded(): Observable<void> {
    return this.loading.pipe(
      filter(loading => loading === false),
      map(() => null)
    );
  }
}
