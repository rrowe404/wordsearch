import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from "@angular/core";
import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";

/** Barrier between app and third-party inputs */
@Component({
    selector: 'wordsearch-input',
    template: `
        <mat-form-field>
            <mat-label *ngIf="label">{{ label }}</mat-label>
            <input matInput [formControl]="formControl" (keyup)="onChange.emit($event.target.value)" />
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
    @Input() public validators: ValidatorFn[];

    @Input() public value: string;

    @Output() public onChange: EventEmitter<string> = new EventEmitter();

    public formControl: FormControl;

    public ngOnDestroy() {
        this.formGroup.removeControl(this.name);
    }

    public ngOnInit() {
        if (!this.name) {
            throw new Error("All InputComponents must have a name!");
        }

        this.formControl = new FormControl(this.value ? this.value : '', this.validators);

        if (this.formGroup) {
            this.formGroup.addControl(this.name, this.formControl);
        }
    }

    public getErrorMessages() {
        return Object.keys(this.formControl.errors).map(key => this.formControl.errors[key]);
    }
}