import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputErrors } from '../Input/InputErrors';
import { ReactAdapter } from '../ReactAdapter/ReactAdapter';
import * as React from 'react';
import { ReactInputListComponent } from './ReactInputListComponent';
import { Input as MyInput } from '../Input/Input';

@Component({
    selector: 'wordsearch-input-list',
    template: `
        <div [id]="rootId">
        </div>
    `
})
export class InputListComponent extends ReactAdapter {
    static counter = 0;

    @Input() public validators: Array<() => InputErrors>;
    @Input() public addSlotButtonText = 'Add Slot';
    @Output() public changed = new EventEmitter<Array<MyInput<string>>>();

    rootId = `wordsearch-input-list-${InputListComponent.counter++}`;

    getComponent(): JSX.Element {
        return (
            <ReactInputListComponent addSlotButtonText={this.addSlotButtonText}
                                     validators={this.validators}
                                     changed={(inputs) => this.inputListChanged(inputs) } />
        );
    }

    inputListChanged(inputs: Array<MyInput<string>>) {
        this.changed.emit(inputs);
    }
}
