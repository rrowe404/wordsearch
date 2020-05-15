import { Component, Input } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'wordsearch-input-list',
    template: `
        <div *ngFor="let input of inputs; let i = index;">
            <wordsearch-input [name]="getName(i)" [formGroup]="formGroup" [validators]="validators"></wordsearch-input>
            <wordsearch-icon-button icon="close" (click)="removeSlot(i)"></wordsearch-icon-button>
        </div>

        <wordsearch-button text="Add Slot" (click)="addSlot()"></wordsearch-button>
    `
})
export class InputListComponent {
    @Input() public formGroup: FormGroup;
    @Input() public validators: ValidatorFn[];

    public inputs: string[] = [''];

    public addSlot() {
        this.inputs.push('');
    }

    public getName(index: number) {
        return `input-${index}`;
    }

    public removeSlot(index: number) {
        this.inputs.splice(index, 1);
    }
}
