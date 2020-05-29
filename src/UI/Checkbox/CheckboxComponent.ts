import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

/** Barrier */
@Component({
    selector: 'wordsearch-checkbox',
    template: `<mat-checkbox [formControl]="formControl" (click)="update()">{{ label }}</mat-checkbox>`
})
export class CheckboxComponent implements OnInit {
    @Input() public formGroup: FormGroup;
    @Input() public label: string;
    @Input() public name: string;
    @Input() public value: boolean;

    @Output() public changed: EventEmitter<boolean> = new EventEmitter();

    public formControl: FormControl;

    public ngOnInit() {
        if (!this.name) {
            throw new Error('All CheckboxComponents must have a name!');
        }

        this.formControl = new FormControl(this.value, []);

        if (this.formGroup) {
            this.formGroup.addControl(this.name, this.formControl);
        }
    }

    public update() {
        // need timeout for formControl.value to be accurate for some reason
        setTimeout(() => {
            this.changed.emit(this.formControl.value);
        });
    }
}
