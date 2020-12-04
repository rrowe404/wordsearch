import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { ButtonComponent as ReactButtonComponent } from './ReactButtonComponent';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactAdapter } from '../ReactAdapter/ReactAdapter';

/** Barrier */
@Component({
    selector: 'wordsearch-button',
    template: `
        <div [id]="rootId"></div>
    `
})
export class ButtonComponent extends ReactAdapter implements OnChanges, AfterViewInit {
    static count = 0;
    public rootId = `button-root-${ButtonComponent.count++}`;

    @Input() public text: string;
    @Input() public color = 'primary';
    @Input() public disabled = false;

    getComponent() {
        return <ReactButtonComponent color={this.color} text={this.text} disabled={this.disabled} />;
    }
}
