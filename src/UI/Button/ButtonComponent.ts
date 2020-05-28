import { Component, Input } from '@angular/core';

/** Barrier */
@Component({
    selector: 'wordsearch-button',
    template: `
        <button mat-raised-button [color]="color" [disabled]="disabled">{{ text }}</button>
    `
})
export class ButtonComponent {
    @Input() public text: string;
    @Input() public color = 'primary';
    @Input() public disabled = false;
}
