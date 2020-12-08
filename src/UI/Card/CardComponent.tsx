import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ReactAdapter } from '../ReactAdapter/ReactAdapter';
import { CardComponent as ReactCardComponent } from './ReactCardComponent';
import * as React from 'react';

@Component({
    selector: 'wordsearch-card',
    styleUrls: ['./Card.less'],
    templateUrl: './CardView.html'
})
export class CardComponent extends ReactAdapter {
    static count = 0;
    rootId = `wordsearch-card-${CardComponent.count++}`;

    @Input() public title: string;

    getComponent(): JSX.Element {
        // TODO project content into ReactCardComponent

        return (
            <div>
                <ReactCardComponent title={this.title}>
                </ReactCardComponent>
            </div>
        );
    }
}
