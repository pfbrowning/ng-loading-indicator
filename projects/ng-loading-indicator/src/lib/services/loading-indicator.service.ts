import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  @Output() eventLoadStarted = new EventEmitter<string>();
  @Output() eventLoadEnded = new EventEmitter();

  public showLoadingIndicator(loadingMessage : string = "Loading") {
    this.eventLoadStarted.emit(loadingMessage);
  }

  public hideLoadingIndicator() {
    this.eventLoadEnded.emit();
  }
}
