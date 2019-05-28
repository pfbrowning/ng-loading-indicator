import { Subject } from 'rxjs';
import {} from 'jasmine';

export function CreateLoadingIndicatorServiceSpy(): any {
    const spy = jasmine.createSpyObj('loadingIndicatorService', ['showLoadingIndicator', 'hideLoadingIndicator']);
    spy['loadStarted'] = new Subject<string>();
    spy['loadEnded'] = new Subject();
    return spy;
}
