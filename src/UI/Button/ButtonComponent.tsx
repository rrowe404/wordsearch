import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { ButtonComponent as ReactButtonComponent } from './ReactButtonComponent';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/** Barrier */
@Component({
    selector: 'wordsearch-button',
    template: `
        <div [id]="rootId"></div>
    `
})
export class ButtonComponent implements OnChanges, AfterViewInit {
    static count = 0;
    public rootId = `button-root-${ButtonComponent.count++}`;
    private hasViewLoaded = false;

    @Input() public text: string;
    @Input() public color = 'primary';
    @Input() public disabled = false;

    ngOnChanges() {
        this.renderComponent();
    }

    ngAfterViewInit() {
        this.hasViewLoaded = true;
        this.renderComponent();
    }

    private renderComponent() {
        if (!this.hasViewLoaded) {
            return;
        }

        let reactComponent = <ReactButtonComponent color={this.color} text={this.text} disabled={this.disabled} />;

        ReactDOM.render(reactComponent, document.getElementById(this.rootId));
    }
}
