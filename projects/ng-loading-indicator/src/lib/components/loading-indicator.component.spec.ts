import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalManagerModule } from '@browninglogic/ng-modal';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { LoadingIndicatorService } from '../services/loading-indicator.service';

describe('LoadingIndicatorComponent', () => {
  let component: LoadingIndicatorComponent;
  let fixture: ComponentFixture<LoadingIndicatorComponent>;
  let service: LoadingIndicatorService;
  let loadingMessageHeader: any;
  let spinnerDiv: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ModalManagerModule ],
      providers: [ LoadingIndicatorService ],
      declarations: [ LoadingIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingIndicatorComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(LoadingIndicatorService);

    // Get a handle to the modal header & spinner div so that we can query the bound text & css classes
    loadingMessageHeader = fixture.debugElement.query(By.css('h1[header]')).nativeElement;
    spinnerDiv = fixture.debugElement.query(By.css('div[body]')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly show and hide the loading indicator', () => {
    // Detect changes to initialize the component
    fixture.detectChanges();

    // Check that everything is as expected upon initialization
    expect(component.loadingIndicatorModal.visible).toBe(false);
    expect(component.loadingMessage).toBeNull();
    expect(loadingMessageHeader.textContent).toBe('');

    // Simulate a load start
    service.showLoadingIndicator('Load Started');
    fixture.detectChanges();

    // Check that the component is visible and shows the proper text
    expect(component.loadingIndicatorModal.visible).toBe(true);
    expect(component.loadingMessage).toBe('Load Started');
    expect(loadingMessageHeader.textContent).toBe('Load Started');

    // Simulate a load end
    service.hideLoadingIndicator();
    fixture.detectChanges();

    /* Check that the component is no longer visible and that
    the loading text was reset. */
    expect(component.loadingIndicatorModal.visible).toBe(false);
    expect(component.loadingMessage).toBeNull();
    expect(loadingMessageHeader.textContent).toBe('');
  });

  it('should properly apply user-provided css classes', () => {
    // Detect changes to initialize the component
    fixture.detectChanges();

    // Test that everything is what we expect it to be upon initialization
    expect(component.loadingIndicatorModal.modalClass).toBe('');
    expect(component.loadingIndicatorModal.overlayClass).toBe('');
    expect(loadingMessageHeader.getAttribute('class')).toBe('nli-loading-message ');
    expect(spinnerDiv.getAttribute('class')).toBe('spinner ');

    // Apply custom CSS classes as input properties
    component.overlayClass = 'testOverlayClass';
    component.modalClass = 'testModalClass';
    component.loadingMessageClass = 'testLoadingMessageClass';
    component.spinnerClass = 'testSpinnerClass';
    fixture.detectChanges();

    // Ensure that the CSS is properly applied to the DOM and the modal component
    expect(component.loadingIndicatorModal.modalClass).toBe('testModalClass');
    expect(component.loadingIndicatorModal.overlayClass).toBe('testOverlayClass');
    expect(loadingMessageHeader.getAttribute('class')).toBe('nli-loading-message testLoadingMessageClass');
    expect(spinnerDiv.getAttribute('class')).toBe('spinner testSpinnerClass');
  });

  it('should show the loading indicator even if showLoadingIndicator was called before the component was initialized', () => {
    // Call showLoadingIndicator before initializing the component
    service.showLoadingIndicator('Load Started');

    // Initialize the component
    fixture.detectChanges();

    // Check that the component is visible and shows the proper text
    expect(component.loadingIndicatorModal.visible).toBe(true);
    expect(component.loadingMessage).toBe('Load Started');
    expect(loadingMessageHeader.textContent).toBe('Load Started');
  });

  it('should gracefully deconstruct if not initialized', () => {
    fixture.destroy();
  });
});
