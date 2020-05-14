import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'wordsearch-input-list',
    template: `
        <div *ngFor="let input of inputs; let i = index;">
            <wordsearch-input [name]="getName(i)" [formGroup]="formGroup"></wordsearch-input>
        </div>

        <wordsearch-button text="Add Slot" (click)="addSlot()"></wordsearch-button>
    `
})
export class InputListComponent {
    @Input() public formGroup: FormGroup;

    public inputs: string[] = [''];

    public addSlot() {
        this.inputs.push('');
    }

    public getName(index: number) {
        return `input-${index}`;
    }
}
