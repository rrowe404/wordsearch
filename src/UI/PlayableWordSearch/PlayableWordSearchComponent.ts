import { Component, Input } from '@angular/core';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';

@Component({
    selector: 'wordsearch-playable',
    template: `
        <span>{{ state.title }}</span>
    `
})
export class PlayableWordSearchComponent {
    @Input() public state: WordSearchState;
}
