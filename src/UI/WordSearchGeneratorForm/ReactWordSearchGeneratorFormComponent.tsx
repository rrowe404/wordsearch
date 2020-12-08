import * as React from 'react';
import { InputComponent } from '../Input/ReactInputComponent';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import * as _ from 'lodash';
import { CardComponent } from '../Card/ReactCardComponent';
import { CheckboxComponent } from '../Checkbox/ReactCheckboxComponent';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { ButtonComponent } from '../Button/ReactButtonComponent';

export class WordSearchGeneratorFormComponent extends React.Component<{}, WordSearchGeneratorFormState> {
    constructor(props) {
        super(props);

        this.state = {
            generationOptions: {
                height: 5,
                width: 5,
                alphabetizeWordList: false,
                showWordList: true,
                title: '',
                words: [],
                filterAccidentalProfanity: false,
                allowHorizontal: true,
                allowVertical: true,
                allowDiagonal: false,
                allowBackwards: false,
                allowOverlaps: false,
                zealousOverlaps: false
            }
        };
    }

    render() {
        /** TODO directionFormGroup */
        /** TODO Generate button disabling */

        return (
            <div>
                <InputComponent label='Title'
                    name='title'
                    value={this.state.generationOptions.title}
                    updated={(title) => this.setStateWithProp('title', title)} />

                <CardComponent title='Allowed Word Directions'>
                    <CheckboxComponent label='Horizontal'
                        name='horizontal'
                        updated={(allow) => this.setStateWithProp('allowHorizontal', allow)}
                        value={this.state.generationOptions.allowHorizontal} />

                    <CheckboxComponent label='Vertical'
                        name='vertical'
                        updated={(allow) => this.setStateWithProp('allowVertical', allow)}
                        value={this.state.generationOptions.allowVertical} />

                    <CheckboxComponent label='Diagonal'
                        name='diagonal'
                        updated={(allow) => this.setStateWithProp('allowDiagonal', allow)}
                        value={this.state.generationOptions.allowDiagonal}
                    />
                </CardComponent>

                <CardComponent title='Size'>
                    <InputComponent label='Columns' name='columns'
                        updated={(columns) => this.setStateWithProp('width', parseInt(columns, 10))}
                        min={5} max={30}
                        inputType='number'
                        required={true}
                        value={this.state.generationOptions.width.toString()} />

                    <InputComponent label='Rows' name='rows'
                        updated={(rows) => this.setStateWithProp('height', parseInt(rows, 10))}
                        min={5} max={30}
                        inputType='number'
                        required={true}
                        value={this.state.generationOptions.height.toString()} />
                </CardComponent>

                <div className='generate' onClick={() => this.generate()}>
                    <ButtonComponent color='primary' text='Generate' disabled={false}/>
                </div>
            </div>
        );
    }

    generate() {
        console.log('woop');
    }

    setStateWithProp(prop: keyof WordSearchGenerationOptions, value: any) {
        let generationOptions = _.cloneDeep(this.state.generationOptions);
        (generationOptions[prop] as any) = value;

        this.setState({ generationOptions });
    }
}
