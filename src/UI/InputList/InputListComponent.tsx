import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputErrors } from '../Input/InputErrors';
import { ReactAdapter } from '../ReactAdapter/ReactAdapter';
import * as React from 'react';
import { ReactInputListComponent } from './ReactInputListComponent';

@Component({
    selector: 'wordsearch-input-list',
    template: `
        <div [id]="rootId">
        </div>
    `
})
export class InputListComponent extends ReactAdapter {
    static counter = 0;

    @Input() public formGroup: FormGroup;
    @Input() public validators: Array<() => InputErrors>;
    @Input() public addSlotButtonText = 'Add Slot';

    rootId = `wordsearch-input-list-${InputListComponent.counter++}`;

    getComponent(): JSX.Element {
        return ( <ReactInputListComponent addSlotButtonText={this.addSlotButtonText} validators={this.validators} /> );
    }
}
