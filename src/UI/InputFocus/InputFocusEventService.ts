import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InputFocusEventService {
    public inputFocusEvent: EventEmitter<string> = new EventEmitter();
}