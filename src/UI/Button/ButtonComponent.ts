import { Component, Input } from '@angular/core';

/** Barrier */
@Component({
    selector: 'wordsearch-button',
    template: `
        <button mat-raised-button [color]="color">{{ text }}</button>
    `
})
export class ButtonComponent {
    @Input() public text: string;
    @Input() public color: string = 'primary';
}