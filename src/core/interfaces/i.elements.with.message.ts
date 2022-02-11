import {IElements} from './i.elements'


export interface IElementsWithMessage extends IElements {
    create(element: HTMLElement, type?: string, message?: string): void
}
