import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactAdapter } from '../ReactAdapter/ReactAdapter';
import { CheckboxComponent as ReactCheckboxComponent } from './ReactCheckboxComponent';
import * as React from 'react';


/** Barrier */
@Component({
    selector: 'wordsearch-checkbox',
    template: `
        <div [id]="rootId"></div>
    `
})
export class CheckboxComponent extends ReactAdapter implements OnInit {
    static count = 0;

    @Input() public label: string;
    @Input() public name: string;
    @Input() public value: boolean;

    @Output() public changed: EventEmitter<boolean> = new EventEmitter();


    rootId = `wordsearch-checkbox-${CheckboxComponent.count++}`;

    getComponent(): JSX.Element {
        return (
            <ReactCheckboxComponent
                label={this.label}
                name={this.name}
                value={this.value}
                updated={(value) => this.update(value)} />
        );
    }

    public ngOnInit() {
        if (!this.name) {
            throw new Error('All CheckboxComponents must have a name!');
        }

        // todo
        // this.formControl = new FormControl(this.value, []);

        // if (this.formGroup) {
        //     this.formGroup.addControl(this.name, this.formControl);
        // }
    }

    public update(value: boolean) {
        this.changed.emit(value);
    }
}
