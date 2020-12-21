import { Component, OnInit } from '@angular/core';
import { ReactAdapter } from '../ReactAdapter/ReactAdapter';
import { WordSearchGeneratorFormConnected } from './ReactWordSearchGeneratorFormComponent';
import * as React from 'react';
import { ReduxConfig } from '../Redux/ReduxConfig';
import { Provider } from 'react-redux';

@Component({
  selector: 'wordsearch-generator-form',
  styleUrls: ['./WordSearchGeneratorFormComponent.less'],
  templateUrl: './WordSearchGeneratorFormComponent.html'
})
export class WordSearchGeneratorFormComponent extends ReactAdapter implements OnInit {
  static count = 0;
  rootId = `wordsearch-generator-form-${WordSearchGeneratorFormComponent.count++}`;
  store;

  constructor(
  ) {
    super();
    let reduxConfig = new ReduxConfig();
    reduxConfig.initialize();
    this.store = reduxConfig.store;
    reduxConfig.store.dispatch({ type: 'SET_WORDS', words: [] })
  }

  getComponent() {
    return ( <Provider store={this.store}><WordSearchGeneratorFormConnected /></Provider> );
  }

  public ngOnInit() {
    // this.playableEventService.activate.subscribe((state: WordSearchState) => {
    //   this.playableState = this.wordSearchStateFactory.createWordSearchCopy(state);
    // });

    // this.playableEventService.deactivate.subscribe(() => this.playableState = null);
  }
}
