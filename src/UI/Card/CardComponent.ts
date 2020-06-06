import { Component, Input } from '@angular/core';

@Component({
    selector: 'wordsearch-card',
    styleUrls: ['./Card.less'],
    templateUrl: './CardView.html'
})
export class CardComponent {
    @Input() public title: string;
}
