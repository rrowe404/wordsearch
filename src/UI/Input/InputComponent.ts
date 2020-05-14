import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

/** Barrier between app and third-party inputs */
@Component({
    selector: 'wordsearch-input',
    template: `
        <mat-form-field>
            <input matInput [formControl]="formControl" />
        </mat-form-field>
    `
})
export class InputComponent implements OnInit {
    @Input() public name: string;
    @Input() public formGroup: FormGroup;

    public formControl: FormControl;

    public ngOnInit() {
        this.formControl = new FormControl('');
        this.formGroup.addControl(this.name, this.formControl);
    }
}