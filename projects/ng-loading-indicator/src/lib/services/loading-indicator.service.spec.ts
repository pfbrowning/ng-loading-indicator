import { TestBed } from '@angular/core/testing';
import { LoadingIndicatorService } from './loading-indicator.service';
import { Subscription } from 'rxjs';

describe('LoadingIndicatorService', () => {
  let loadingIndicatorService: LoadingIndicatorService;
  let loadStartedSpy: any;
  let loadEndedSpy: any;
  let loadStartedSub: Subscription;
  let loadEndedSub: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loadingIndicatorService = TestBed.get(LoadingIndicatorService);
    loadStartedSpy = jasmine.createSpyObj('loadStarted', [ 'emit', 'error', 'complete' ]);
    loadEndedSpy = jasmine.createSpyObj('loadEnded', [ 'emit', 'error', 'complete' ]);
  });

  it('should be created', () => {
    const service: LoadingIndicatorService = TestBed.get(LoadingIndicatorService);
    expect(service).toBeTruthy();
  });

  it('should properly emit load start event', () => {
    loadStartedSub = loadingIndicatorService.loadStarted.subscribe(
      message => loadStartedSpy.emit(message),
      error => loadStartedSpy.error(error),
      () => loadStartedSpy.complete()
    );
    expect(loadEndedSpy.emit).not.toHaveBeenCalled();

    loadingIndicatorService.showLoadingIndicator('Showing Indicator');
    expect(loadStartedSpy.emit).toHaveBeenCalledTimes(1);
    expect(loadStartedSpy.emit.calls.mostRecent().args).toEqual(['Showing Indicator']);

    loadStartedSub.unsubscribe();
    expect(loadStartedSpy.emit).toHaveBeenCalledTimes(1);
    expect(loadStartedSpy.error).not.toHaveBeenCalled();
    expect(loadStartedSpy.complete).not.toHaveBeenCalled();
  });

  it('should properly emit load start event with the default loading text', () => {
    loadStartedSub = loadingIndicatorService.loadStarted.subscribe(
      message => loadStartedSpy.emit(message),
      error => loadStartedSpy.error(error),
      () => loadStartedSpy.complete()
    );
    expect(loadStartedSpy.emit).not.toHaveBeenCalled();

    loadingIndicatorService.showLoadingIndicator();

    expect(loadStartedSpy.emit).toHaveBeenCalledTimes(1);
    expect(loadStartedSpy.emit.calls.mostRecent().args).toEqual(['Loading']);

    loadStartedSub.unsubscribe();
    expect(loadStartedSpy.emit).toHaveBeenCalledTimes(1);
    expect(loadStartedSpy.error).not.toHaveBeenCalled();
    expect(loadStartedSpy.complete).not.toHaveBeenCalled();
  });

  it('should emit load end on initial subscription', () => {
    loadEndedSub = loadingIndicatorService.loadEnded.subscribe(
      () => loadEndedSpy.emit(),
      error => loadEndedSpy.error(error),
      () => loadEndedSpy.complete()
    );

    expect(loadEndedSpy.emit).toHaveBeenCalledTimes(1);

    loadEndedSub.unsubscribe();
    expect(loadEndedSpy.emit).toHaveBeenCalledTimes(1);
    expect(loadEndedSpy.error).not.toHaveBeenCalled();
    expect(loadEndedSpy.complete).not.toHaveBeenCalled();
  });

  it('should properly emit load start and then load end', () => {
    loadStartedSub = loadingIndicatorService.loadStarted.subscribe(
      message => loadStartedSpy.emit(message),
      error => loadStartedSpy.error(error),
      () => loadStartedSpy.complete()
    );
    loadEndedSub = loadingIndicatorService.loadEnded.subscribe(
      () => loadEndedSpy.emit(),
      error => loadEndedSpy.error(error),
      () => loadEndedSpy.complete()
    );
    expect(loadStartedSpy.emit).not.toHaveBeenCalled();
    expect(loadEndedSpy.emit).toHaveBeenCalledTimes(1);

    loadingIndicatorService.showLoadingIndicator('Showing Indicator');
    expect(loadStartedSpy.emit).toHaveBeenCalledTimes(1);
    expect(loadStartedSpy.emit.calls.mostRecent().args).toEqual(['Showing Indicator']);
    expect(loadEndedSpy.emit).toHaveBeenCalledTimes(1);

    loadingIndicatorService.hideLoadingIndicator();
    expect(loadEndedSpy.emit).toHaveBeenCalledTimes(2);
    expect(loadStartedSpy.emit).toHaveBeenCalledTimes(1);

    loadStartedSub.unsubscribe();
    expect(loadStartedSpy.error).not.toHaveBeenCalled();
    expect(loadStartedSpy.complete).not.toHaveBeenCalled();
    expect(loadEndedSpy.error).not.toHaveBeenCalled();
    expect(loadEndedSpy.complete).not.toHaveBeenCalled();
  });
});
