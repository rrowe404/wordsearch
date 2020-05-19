import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ElementRef } from "@angular/core";
import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { InputFocusEventService } from '../InputFocus/InputFocusEventService';

/** Barrier between app and third-party inputs */
@Component({
    selector: 'wordsearch-input',
    template: `
        <mat-form-field>
            <mat-label *ngIf="label">{{ label }}</mat-label>
            <input matInput [formControl]="formControl" (keyup)="updateValue($event)" (mouseup)="updateValue($event)" [type]="type" />
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
    @Input() public type: string = 'text';
    @Input() public validators: ValidatorFn[];

    @Input() public value: string;

    @Output() public onChange: EventEmitter<string> = new EventEmitter();

    public formControl: FormControl;

    constructor(
        private element: ElementRef,
        private inputFocusEventService: InputFocusEventService
    ) {}

    public ngOnDestroy() {
        if (this.formGroup) {
            this.formGroup.removeControl(this.name);
        }
    }

    public ngOnInit() {
        if (!this.name) {
            throw new Error("All InputComponents must have a name!");
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
        return Object.keys(this.formControl.errors).map(key => this.formControl.errors[key]);
    }

    public updateValue(event: any) {
        this.onChange.emit(event.target.value);
    }
}