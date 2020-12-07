import { Component, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';
import { InputFocusEventService } from '../InputFocus/InputFocusEventService';
import { ReactAdapter } from '../ReactAdapter/ReactAdapter';
import * as React from 'react';
import { InputComponent as ReactInputComponent } from './ReactInputComponent';
import { InputErrors } from './InputErrors';

/** Barrier between app and third-party inputs */

@Component({
    selector: 'wordsearch-input',
    template: `
        <div [id]="rootId">
        </div>
    `
})
export class InputComponent extends ReactAdapter implements OnInit {
    constructor(
        private element: ElementRef,
        private inputFocusEventService: InputFocusEventService
    ) {
        super();
    }

    static count = 0;
    @Input() public label: string;
    @Input() public name: string;
    @Input() public type = 'text';

    @Input() public min: number;
    @Input() public max: number;
    @Input() public required = false;

    @Input() public validators: Array<(value: string) => InputErrors>;
    @Input() public value: string;

    @Output() public changed: EventEmitter<string> = new EventEmitter();

    rootId = `wordsearch-input-${InputComponent.count++}`;

    getComponent(): JSX.Element {
        return (
            <ReactInputComponent
                label={this.label} name={this.name} value={this.value}
                required={this.required} min={this.min} max={this.max}
                inputType={this.type} validators={this.validators}
                updated={(value) => this.onUpdate(value)}
            ></ReactInputComponent>
        );
    }

    public ngOnInit() {
        this.inputFocusEventService.inputFocusEvent.subscribe(name => {
            if (this.name === name) {
                this.element.nativeElement.querySelector('input').focus();
            }
        });
    }

    public onUpdate(value: string) {
        this.changed.emit(value);
    }
}
