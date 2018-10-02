import { NgModule } from '@angular/core';
import { ModalManagerModule } from '@browninglogic/ng-modal';
import { LoadingIndicatorComponent } from './components/loading-indicator.component';

@NgModule({
  imports: [ ModalManagerModule ],
  declarations: [ LoadingIndicatorComponent ],
  exports: [ LoadingIndicatorComponent ]
})
export class NgLoadingIndicatorModule { }
