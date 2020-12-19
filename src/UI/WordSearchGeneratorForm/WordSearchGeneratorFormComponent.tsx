import { Component, OnInit } from '@angular/core';
import { WordSearchStateFactory } from 'src/Rules/WordSearchState/WordSearchStateFactory';
import { WordValidationService } from 'src/Rules/WordValidation/WordValidationService';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { PlayableEventService } from '../PlayableEvent/PlayableEventService';
import { InputErrors } from '../Input/InputErrors';
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
    private playableEventService: PlayableEventService,
    private wordSearchStateFactory: WordSearchStateFactory,
    private wordValidationService: WordValidationService
  ) {
    super();
    let reduxConfig = new ReduxConfig();
    reduxConfig.initialize();
    this.store = reduxConfig.store;
    reduxConfig.store.dispatch({ type: 'SET_WORDS', words: [] })
  }

  // public gameFormGroup: FormGroup;
  // public directionFormGroup: FormGroup;
  // public wordFormGroup: FormGroup;

  /**
   * We need a WordSearchState in order to validate the words as they are typed.
   * This one will not actually be used to compute the final result.
   * Changes to generationOptions should be immediately reflected in dummyState.
   */
  public dummyState: WordSearchState;

  /** if this is populated, we should display a component that allows it to be played */
  public playableState: WordSearchState;

  public wordValidators: Array<(value: string) => InputErrors>;

  getComponent() {
    return ( <Provider store={this.store}><WordSearchGeneratorFormConnected /></Provider> );
  }

  public ngOnInit() {
    // this.dummyState = this.wordSearchStateFactory.createWordSearch(this.generationOptions);

    this.wordValidators = [
      (value: string) => {
        return this.wordValidationService.getErrors(this.dummyState, value);
      }
    ];

    // todo
    // this.gameFormGroup = new FormGroup({});

    // this.directionFormGroup = new FormGroup({}, (group: FormGroup) => {
    //   let isValid = Object.keys(group.controls).some(key => group.controls[key].value);

    //   return isValid ? null : { required: 'At least one direction must be selected!' };
    // });

    // this.wordFormGroup = new FormGroup({});

    // this.gameFormGroup.addControl('direction', this.directionFormGroup);
    // this.gameFormGroup.addControl('word', this.wordFormGroup);
    // this.gameFormGroup.setValidators((group) => {
    //   return this.getWordsFromForm().length > 0 ? null : { required: 'At least one word must be present!' };
    // });

    this.playableEventService.activate.subscribe((state: WordSearchState) => {
      this.playableState = this.wordSearchStateFactory.createWordSearchCopy(state);
    });

    this.playableEventService.deactivate.subscribe(() => this.playableState = null);
  }

  public generate() {
    // this.generationOptions.words = this.getWordsFromForm();

    // let result = this.wordSearchGenerationService.generateWordSearch(this.generationOptions);

    // if (this.outputStrategy) {
    //   this.outputStrategy.clean();
    // }

    // this.outputStrategy = this.wordSearchOutputStrategyFactory.createOutputStrategy(this.selectedOutputOption);
    // this.outputStrategy.output(result);
  }

  /** The functions that call this will fire after a UI change that may change whether currently-entered words are still valid */
  // private updateWordListValidity() {
  //   Object.keys(this.wordFormGroup.controls).forEach(key => {
  //     this.wordFormGroup.controls[key].updateValueAndValidity();
  //   });
  // }
}
