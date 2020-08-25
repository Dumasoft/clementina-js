import { IElements } from './IElements';
import { Observable } from 'rxjs';

export interface IElementsWithEvent extends IElements {
    create(element: HTMLElement): Observable<string>;
    setEvents(element: HTMLElement): Observable<string>;
}
