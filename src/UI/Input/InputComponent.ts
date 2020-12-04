import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { InputFocusEventService } from '../InputFocus/InputFocusEventService';
import { ErrorStateMatcher } from '@angular/material/core';
import { InvalidErrorStateMatcher } from '../ErrorStateMatcher/InvalidErrorStateMatcher';

/** Barrier between app and third-party inputs */
@Component({
    selector: 'wordsearch-input',
    template: `
        <mat-form-field>
            <label *ngIf="label">{{ label }}</label>
            <input matInput [errorStateMatcher]="matcher" [formControl]="formControl" (keyup)="updateValue($event)" (mouseup)="updateValue($event)" [type]="type" />
            <mat-error *ngIf="formControl.invalid">
                <div *ngFor="let message of getErrorMessages()">
                    {{ message }}
                </div>
            </mat-error>
        </mat-form-field>
    `
})
export class InputComponent implements OnDestroy, OnInit {
    @Input() public label: string;
    @Input() public name: string;
    @Input() public formGroup: FormGroup;
    @Input() public type = 'text';
    @Input() public validators: ValidatorFn[] = [];

    @Input() public min: number;
    @Input() public max: number;
    @Input() public required = false;

    @Input() public value: string;

    @Output() public changed: EventEmitter<string> = new EventEmitter();

    public formControl: FormControl;
    public matcher: ErrorStateMatcher = new InvalidErrorStateMatcher();

    constructor(
        private element: ElementRef,
        private inputFocusEventService: InputFocusEventService
    ) {}

    public ngOnDestroy() {
        // this is a fallback, if the input is being removed by a parent component,
        // it should be removed from the formGroup there
        if (this.formGroup && this.formGroup.controls[this.name]) {
            this.formGroup.removeControl(this.name);
        }
    }

    public ngOnInit() {
        if (!this.name) {
            throw new Error('All InputComponents must have a name!');
        }

        if (this.min) {
            this.validators.push(Validators.min(this.min));
        }

        if (this.max) {
            this.validators.push(Validators.max(this.max));
        }

        if (this.required) {
            this.validators.push(Validators.required);
        }

        this.formControl = new FormControl(this.value ? this.value : '', this.validators);

        if (this.formGroup) {
            this.formGroup.addControl(this.name, this.formControl);
        }

        this.inputFocusEventService.inputFocusEvent.subscribe(name => {
            if (this.name === name) {
                this.element.nativeElement.querySelector('input').focus();
            }
        });
    }

    public getErrorMessages() {
        return Object.keys(this.formControl.errors).map(key => this.getErrorMessage(key));
    }

    public updateValue(event: any) {
        this.changed.emit(event.target.value);
    }

    private getErrorMessage(key: string) {
        switch (key) {
            case 'required':
                return 'Required';

            case 'min':
            case 'max':
                return `(${this.min}-${this.max})`;

            default:
                return this.formControl.errors[key];
        }
    }
}
