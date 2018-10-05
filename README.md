<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/pfbrowning/ng-loading-indicator/master/src/assets/logo.svg">
</p>

# ng-loading-indicator - A simple, customizable, CSS-based loading indicator for Angular 6

[![Build Status](https://travis-ci.org/pfbrowning/ng-loading-indicator.svg?branch=master)](https://travis-ci.org/pfbrowning/ng-loading-indicator)
[![Coverage Status](https://coveralls.io/repos/github/pfbrowning/ng-loading-indicator/badge.svg?branch=master)](https://coveralls.io/github/pfbrowning/ng-loading-indicator?branch=master)
[![dependency Status](https://david-dm.org/pfbrowning/ng-loading-indicator.svg?path=projects%2Fng-loading-indicator)](https://david-dm.org/pfbrowning/ng-loading-indicator?path=projects%2Fng-loading-indicator)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Peer Dependencies
* [@browninglogic/ng-modal](https://github.com/pfbrowning/ng-modal) (^3.0.1)

## Installation

1. Install npm module:
```bash
$ npm install @browninglogic/ng-loading-indicator --save
```

2. Import NgLoadingIndicatorModule
```typescript
import { NgLoadingIndicatorModule } from '@browninglogic/ng-loading-indicator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgLoadingIndicatorModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```
## Usage
Place a single `<nli-loading-indicator></nli-loading-indicator>` within the template of your application's root component (app.component.html by Angular CLI convention).  This is a global loading indicator which will show and hide itself accordingly when you tell it to using the LoadingIndicatorService from anywhere within the application.
```html
<nli-loading-indicator></nli-loading-indicator>
```
Inject the LoadingIndicatorService into any component that you want to show the loading indicator from.  When you want to show the loading indicator, call `showLoadingIndicator()` on the injected service, optionally passing custom text to show as the header.  If you don't provide loading text, the indicator will be shown with a default header of "Loading".  When you want to hide the loading indicator, simply call `hideLoadingIndicator` on the injected service.
```typescript
constructor(private loadingIndicatorService : LoadingIndicatorService) {}

public show(): void {
    // Show the loading indicator
    this.loadingIndicatorService.showLoadingIndicator();
    // Simulate a two second API call
    timer(2000)
      /* Hide the loading indicator after the completion of the API call. */
      .pipe(finalize(() => this.loadingIndicatorService.hideLoadingIndicator()))
      .subscribe();
}
```
Take note of the fact that we're hiding the loading indicator within finalize, rather than within subscribe: we want to close the loading indicator regardless of whether the operation completed successfully or errored out.

You can change the loading text in the middle of a long-running operation by calling showLoadingIndicator with different messages throughout your long-running operation before finally calling hideLoadingIndicator upon completion.  This could be useful if you're performing a complicated Observable sequence involving multiple sequential API calls and you want to inform your user of what's happening throughout the process.
```typescript

public showDifferentMessages(): void {
    // Show the loading indicator with custom loading message text
    this.loadingIndicatorService.showLoadingIndicator("Fetching the first thing");
    // Simulate a two second API call
    timer(2000).pipe(
      // Change the loading message text between the first and second simulated API call
      tap(() => this.loadingIndicatorService.showLoadingIndicator("Fetching something else")),
      // Simulate a second two second API call
      switchMap(() => timer(2000)),
      /* Hide the loading indicator upon completion of both of the simulated API 
      calls, regardless of whether the operation succeeded or failed. */
      finalize(() => this.loadingIndicatorService.hideLoadingIndicator())
    ).subscribe();
}
```
## Styling
[@browninglogic/ng-loading-indicator](https://github.com/pfbrowning/ng-loading-indicator) uses [@browninglogic/ng-modal](https://github.com/pfbrowning/ng-modal) and, as such, styling works in the same way for both components.  The component provides four input properties which allow you to supply your own CSS classes:
* *modalClass* - class to apply to the modal window of the underlying @browninglogic/ng-modal.  This is a simple passthrough.
* *overlayClass* - class to apply to the overlay of the underlying @browninglogic/ng-modal.  This is a simple passthrough.
* *loadingMessageClass* - class to apply to the loading message header.  For example, if you want to adjust the font or header, this would be the place to do it.
* *spinnerClass* - class to apply to the CSS spinner.  For example, if you wanted to change the size, color, or speed of the spinner, this would be the place to do it.
### Example Template
```html
<nli-loading-indicator modalClass="customModal" overlayClass="customOverlay" loadingMessageClass="customLoadingMessage" spinnerClass="customSpinner"></nli-loading-indicator>
```
### Example Global Styles
```css
/* In order to set basic styles that aren't already applied by
the library, simply define your custom styles in a CSS class and
then bind that class name to the corresponding input property */
.customLoadingMessage {
    font-style:italic;
}
/* Use a more specific CSS selector in order to 
override styles which are already applied by the
library, such as changing the color of the spinner*/
div.spinner.customSpinner {
    border-top-color:green;
}
/* Override the loading message header margin */
h1.loadingMessage.customLoadingMessage {
    margin:15px;
}
/* Override the border color of the loading indicator modal */
div.modalWindow.customModal {
    border-color: black;
}
/* Override the modal overlay with a higher opacity */
div.modalOverlay.customOverlay {
    background: rgba(0, 0, 0, 0.7);
}
```

## Demo
View it in action here: https://pfbrowning.github.io/ng-loading-indicator

## Documentation
More detailed documentation can be found <a href="https://pfbrowning.github.io/ng-loading-indicator/doc/index.html">here</a>.

## License

MIT © [Patrick Browning](mailto:patrick@browninglogic.com)