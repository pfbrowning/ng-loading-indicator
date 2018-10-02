import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ModalManagerModule } from '@browninglogic/ng-modal';
import { NgLoadingIndicatorModule } from 'ng-loading-indicator';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ModalManagerModule, NgLoadingIndicatorModule ],
      declarations: [ AppComponent ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
