import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

/** Barrier between app and third-party inputs */
@Component({
    selector: 'wordsearch-input',
    template: `
        <mat-form-field>
            <mat-label *ngIf="label">{{ label }}</mat-label>
            <input matInput [formControl]="formControl" />
        </mat-form-field>
    `
})
export class InputComponent implements OnDestroy, OnInit {
    @Input() public label: string;
    @Input() public name: string;
    @Input() public formGroup: FormGroup;

    public formControl: FormControl;

    public ngOnDestroy() {
        this.formGroup.removeControl(this.name);
    }

    public ngOnInit() {
        this.formControl = new FormControl('');
        this.formGroup.addControl(this.name, this.formControl);
    }
}