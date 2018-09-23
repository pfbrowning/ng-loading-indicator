import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLoadingIndicatorComponent } from './ng-loading-indicator.component';

describe('NgLoadingIndicatorComponent', () => {
  let component: NgLoadingIndicatorComponent;
  let fixture: ComponentFixture<NgLoadingIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgLoadingIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgLoadingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
