import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { LoadingIndicatorService } from '../services/loading-indicator.service';
import { Subscription } from 'rxjs';
import { ModalWindowComponent } from '@browninglogic/ng-modal';


/** This component listens for load start and load end events and
 * shows / hides a loading indicator accordingly.  It's intended
 * to be placed in the template of the application's root component
 * so that one instance of the component can be used throughout the
 * entire application. */
@Component({
  selector: 'nli-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  constructor(private loadingIndicatorService: LoadingIndicatorService) {}
  /** Custom CSS class(es) to apply to the modal*/
  @Input() modalClass = '';
  /** Custom CSS class(es) to apply to the overlay*/
  @Input() overlayClass = '';
  /** Custom CSS class(es) to apply to the loading message*/
  @Input() loadingMessageClass = '';
  /** Custom CSS class(es) to apply to the spinner*/
  @Input() spinnerClass = '';
  @ViewChild('loadingIndicatorModal') loadingIndicatorModal: ModalWindowComponent;
  private _loadingMessage: string;
  private subLoadStarted: Subscription;
  private subLoadEnded: Subscription;

  /** Loading message to bind to the loading modal window */
  public get loadingMessage(): string {
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
  private onLoadStarted(loadingMessage: string) {
    this._loadingMessage = loadingMessage;
    this.loadingIndicatorModal.show();
  }

  /** Hide the loading indicator and clear the loading message */
  private onLoadEnded() {
    this._loadingMessage = null;
    this.loadingIndicatorModal.hide();
  }
}
