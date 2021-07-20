import { IElements } from './IElements'


export interface IElementsWithMessage extends IElements {
    create(element: HTMLElement, type?: string, message?: string): void
}
