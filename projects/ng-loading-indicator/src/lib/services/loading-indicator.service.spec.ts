import { TestBed } from '@angular/core/testing';
import { LoadingIndicatorService } from './loading-indicator.service';

describe('LoadingIndicatorService', () => {
  let loadingIndicatorService: LoadingIndicatorService;
  let loadStartedSpy: jasmine.Spy;
  let loadEndedSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loadingIndicatorService = TestBed.get(LoadingIndicatorService);
    loadStartedSpy = spyOn(loadingIndicatorService.eventLoadStarted, 'emit').and.callThrough();
    loadEndedSpy = spyOn(loadingIndicatorService.eventLoadEnded, 'emit').and.callThrough();
  });

  it('should be created', () => {
    const service: LoadingIndicatorService = TestBed.get(LoadingIndicatorService);
    expect(service).toBeTruthy();
  });

  it('should properly emit load start event', () => {
    loadingIndicatorService.showLoadingIndicator('Showing Indicator');

    expect(loadStartedSpy).toHaveBeenCalledTimes(1);
    expect(loadStartedSpy).toHaveBeenCalledWith('Showing Indicator');
  });

  it('should properly emit load ended event', () => {
    loadingIndicatorService.hideLoadingIndicator();

    expect(loadEndedSpy).toHaveBeenCalledTimes(1);
  });
});
