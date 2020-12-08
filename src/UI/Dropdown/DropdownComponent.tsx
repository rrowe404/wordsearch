import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownOption } from './DropdownOption';
import { MatSelectChange } from '@angular/material/select';
import { ReactAdapter } from '../ReactAdapter/ReactAdapter';
import * as React from 'react';
import { DropdownComponent as ReactDropdownComponent } from './ReactDropdownComponent';

/** Acts as a barrier between third-party select component and rest of app */
@Component({
    selector: 'wordsearch-dropdown',
    template: `
        <mat-form-field>
            <label>{{ label }}</label>

            <mat-select (selectionChange)="selectionChanged($event)" [value]="selected">
                <mat-option *ngFor="let option of options" [value]="option.value">
                    {{ option.viewValue }}
                </mat-option>
            </mat-select>
        </mat-form-field>

        <div [id]="rootId"></div>
    `
})
export class DropdownComponent extends ReactAdapter {
    static count = 0;
    rootId = `wordsearch-dropdown-${DropdownComponent.count++}`;

    @Input() public label: string;
    @Input() public options: DropdownOption<any>[];
    @Input() public selected: DropdownOption<any>;
    @Output() public changed: EventEmitter<any> = new EventEmitter();

    getComponent(): JSX.Element {
        return ( <ReactDropdownComponent label={this.label} /> );
    }

    public selectionChanged(event: MatSelectChange) {
        this.changed.emit(event.value);
    }
}
