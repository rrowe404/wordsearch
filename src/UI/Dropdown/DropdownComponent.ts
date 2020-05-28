import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownOption } from './DropdownOption';
import { MatSelectChange } from '@angular/material/select';

/** Acts as a barrier between third-party select component and rest of app */
@Component({
    selector: 'wordsearch-dropdown',
    template: `
        <mat-form-field>
            <mat-label>{{ label }}</mat-label>

            <mat-select (selectionChange)="selectionChanged($event)" [value]="selected">
                <mat-option *ngFor="let option of options" [value]="option.value">
                    {{ option.viewValue }}
                </mat-option>
            </mat-select>
        </mat-form-field>
    `
})
export class DropdownComponent {
    @Input() public label: string;
    @Input() public options: DropdownOption<any>[];
    @Input() public selected: DropdownOption<any>;
    @Output() public onChange: EventEmitter<any> = new EventEmitter();

    public selectionChanged(event: MatSelectChange) {
        this.onChange.emit(event.value);
    }
}
