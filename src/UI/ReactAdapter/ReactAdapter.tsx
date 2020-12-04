import { AfterViewInit, OnChanges } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/** bridges an Angular Component declaration with a React component */
export abstract class ReactAdapter implements OnChanges, AfterViewInit {
    abstract rootId: string;

    private hasViewLoaded = false;
    abstract getComponent(): JSX.Element;

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

        let reactComponent = this.getComponent();

        ReactDOM.render(reactComponent, document.getElementById(this.rootId));
    }
}
