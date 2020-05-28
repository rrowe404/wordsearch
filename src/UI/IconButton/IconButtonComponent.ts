import { Component, Input } from '@angular/core';

/** Barrier */
@Component({
    selector: 'wordsearch-icon-button',
    template: `
        <button mat-icon-button>
            <mat-icon>{{ icon }}</mat-icon>
        </button>
    `
})
export class IconButtonComponent {
    @Input() public icon: string;
}
