import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LoadingIndicatorService } from '../services/loading-indicator.service';
import { Subscription } from 'rxjs';
import { ModalWindowComponent } from '@browninglogic/ng-modal';

@Component({
  selector: 'nli-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  constructor(private loadingIndicatorService : LoadingIndicatorService) {}

  @ViewChild('loadingIndicatorModal') loadingIndicatorModal : ModalWindowComponent;
  private _loadingMessage : string;
  private subLoadStarted : Subscription;
  private subLoadEnded : Subscription;

  /** Loading message to bind to the loading modal window */
  public get loadingMessage() : string {
    return this._loadingMessage;
  }

  ngOnInit() {
    // Subscribe to the relevant events in order to show and hide the modal
    this.subLoadStarted = this.loadingIndicatorService.eventLoadStarted.subscribe(loadingMessage => this.onLoadStarted(loadingMessage));
    this.subLoadEnded = this.loadingIndicatorService.eventLoadEnded.subscribe(() => this.onLoadEnded());
  }

  ngOnDestroy() {
    this.subLoadStarted.unsubscribe();
    this.subLoadEnded.unsubscribe();
  }

  /** Show the loading indicator and set the provided loading message for template binding */
  private onLoadStarted(loadingMessage : string) {
    this._loadingMessage = loadingMessage;
    this.loadingIndicatorModal.show();
  }

  /** Hide the loading indicator and clear the loading message */
  private onLoadEnded() {
    this._loadingMessage = null;
    this.loadingIndicatorModal.hide();
  }
}
