import { TestBed } from '@angular/core/testing';

import { NgLoadingIndicatorService } from './ng-loading-indicator.service';

describe('NgLoadingIndicatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgLoadingIndicatorService = TestBed.get(NgLoadingIndicatorService);
    expect(service).toBeTruthy();
  });
});
