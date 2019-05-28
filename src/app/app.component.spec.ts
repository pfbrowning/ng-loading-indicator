import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ModalManagerModule } from '@browninglogic/ng-modal';
import { NgLoadingIndicatorModule } from '@browninglogic/ng-loading-indicator';
import { LoadingIndicatorSpyFactories } from '@browninglogic/ng-loading-indicator/testing';
import { MatToolbarModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalManagerModule, 
        NgLoadingIndicatorModule,
        FormsModule,
        MatToolbarModule,
        MatCheckboxModule
      ],
      declarations: [ AppComponent ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should create a spy factory', async(() => {
    let factory = LoadingIndicatorSpyFactories.CreateLoadingIndicatorServiceSpy();
    expect(factory).not.toBeNull();
    expect(factory).not.toBeUndefined();
    expect(factory.showLoadingIndicator).not.toHaveBeenCalled();
  }));
});
