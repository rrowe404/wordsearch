import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputErrors } from '../Input/InputErrors';
import { InputFocusEventService } from '../InputFocus/InputFocusEventService';
import { ReactAdapter } from '../ReactAdapter/ReactAdapter';
import * as React from 'react';

@Component({
    selector: 'wordsearch-input-list',
    template: `
        <div *ngFor="let input of inputs; let i = index;">
            <wordsearch-input [name]="input.name" [validators]="validators" (changed)="inputUpdated()"></wordsearch-input>
            <button class="icon" (click)="removeSlot(i)">✖</button>
        </div>

        <wordsearch-button [text]="addSlotButtonText" (click)="addSlot()"></wordsearch-button>

        <div [id]="rootId">
        </div>
    `
})
export class InputListComponent extends ReactAdapter {
    static counter = 0;

    @Input() public formGroup: FormGroup;
    @Input() public validators: Array<() => InputErrors>;
    @Input() public addSlotButtonText = 'Add Slot';
    public inputs: Array<{name: string }> = [{ name: this.getNextName() }];

    private inputCounter = 0;

    rootId = `wordsearch-input-list-${InputListComponent.counter++}`;

    getComponent(): JSX.Element {
        return ( <div>Hello</div> );
    }

    constructor(
        private inputFocusEventService: InputFocusEventService
    ) {
        super();
    }


    public addSlot() {
        this.inputs.push({ name: this.getNextName() });
        this.focusNewestInput();
    }

    public getNextName() {
        return `input-${this.inputCounter++}`;
    }

    public removeSlot(index: number) {
        // removing here instead of letting ngOnDestroy run prevents ExpressionChangedAfterItHasBeenChecked error
        this.formGroup.removeControl(this.inputs[index].name);
        this.inputs.splice(index, 1);
    }

    private focusNewestInput() {
        setTimeout(() => {
            this.inputFocusEventService.inputFocusEvent.emit(this.inputs[this.inputs.length - 1].name);
        });
    }

    public inputUpdated() {
        // do something amazing
    }
}
