import { Subject } from 'rxjs';

export function createLoadingIndicatorServiceSpy(): any {
    const spy = jasmine.createSpyObj('loadingIndicatorService', ['showLoadingIndicator', 'hideLoadingIndicator']);
    spy['loadStarted'] = new Subject<string>();
    spy['loadEnded'] = new Subject();
    return spy;
}
