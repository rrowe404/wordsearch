import { Component, Input, ElementRef } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { InputFocusEventService } from '../InputFocus/InputFocusEventService';

@Component({
    selector: 'wordsearch-input-list',
    template: `
        <div *ngFor="let input of inputs; let i = index;">
            <wordsearch-input [name]="getName(i)" [formGroup]="formGroup" [validators]="validators"></wordsearch-input>
            <wordsearch-icon-button icon="close" (click)="removeSlot(i)"></wordsearch-icon-button>
        </div>

        <wordsearch-button [text]="addSlotButtonText" (click)="addSlot()"></wordsearch-button>
    `
})
export class InputListComponent {
    @Input() public formGroup: FormGroup;
    @Input() public validators: ValidatorFn[];
    @Input() public addSlotButtonText: string = 'Add Slot';

    constructor(
        private inputFocusEventService: InputFocusEventService
    ) {
    }

    public inputs: string[] = [''];

    public addSlot() {
        this.inputs.push('');
        this.focusNewestInput();
    }

    public getName(index: number) {
        return `input-${index}`;
    }

    public removeSlot(index: number) {
        this.inputs.splice(index, 1);
    }

    private focusNewestInput() {
        setTimeout(() => {
            this.inputFocusEventService.inputFocusEvent.emit(this.getName(this.inputs.length - 1));
        });
    }
}
