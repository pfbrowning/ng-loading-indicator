import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ModalManagerModule } from '@browninglogic/ng-modal';
import { NgLoadingIndicatorModule } from '@browninglogic/ng-loading-indicator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { createLoadingIndicatorServiceSpy } from '@browninglogic/ng-loading-indicator/testing';

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
    const factory = createLoadingIndicatorServiceSpy();
    expect(factory).not.toBeNull();
    expect(factory).not.toBeUndefined();
    expect(factory.showLoadingIndicator).not.toHaveBeenCalled();
  }));
});
