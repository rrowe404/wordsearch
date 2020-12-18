import * as React from 'react';
import { InputComponent } from '../Input/ReactInputComponent';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import * as _ from 'lodash';
import { CardComponent } from '../Card/ReactCardComponent';
import { CheckboxComponent } from '../Checkbox/ReactCheckboxComponent';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { ButtonComponent } from '../Button/ReactButtonComponent';
import { WordSearchGeneratorFormProps } from './WordSearchGeneratorFormProps';
import { ReactInputListComponent } from '../InputList/ReactInputListComponent';
import { Input } from '../Input/Input';
import { Form, Formik } from 'formik';
import { DropdownComponent } from '../Dropdown/ReactDropdownComponent';

export class WordSearchGeneratorFormComponent extends React.Component<{}, WordSearchGeneratorFormState> {
    constructor(public props: WordSearchGeneratorFormProps) {
        super(props);

        this.state = {
            currentFormWords: [],
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
            },
            selectedOutputOption: ''
        };
    }

    render() {
        /** TODO directionFormGroup */
        /** TODO Generate button disabling */
        /** TODO setColumns/setRows update validity of words */

        return (
            <Formik initialValues={this.state.generationOptions} onSubmit={() => { console.log('submit' )}}>
                {props => (
                    <Form>
                        <InputComponent label='Title'
                            formProps={props}
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
                                formProps={props}
                                updated={(columns) => this.setStateWithProp('width', parseInt(columns, 10))}
                                min={5} max={30}
                                inputType='number'
                                required={true}
                                value={this.state.generationOptions.width.toString()} />

                            <InputComponent label='Rows' name='rows'
                                formProps={props}
                                updated={(rows) => this.setStateWithProp('height', parseInt(rows, 10))}
                                min={5} max={30}
                                inputType='number'
                                required={true}
                                value={this.state.generationOptions.height.toString()} />
                        </CardComponent>

                        <CardComponent title='Misc. Options'>
                            <CheckboxComponent label='Show Word List'
                                name='wordList'
                                updated={(checked) => this.setStateWithProp('showWordList', checked)}
                                value={this.state.generationOptions.showWordList} />

                            {this.state.generationOptions.showWordList ?
                                <CheckboxComponent label='Alphabetize Word List'
                                    name='alphabetize'
                                    updated={(checked) => this.setStateWithProp('alphabetizeWordList', checked)}
                                    value={this.state.generationOptions.alphabetizeWordList} /> : null
                            }

                            <CheckboxComponent label='Filter Accidental Profanity'
                                name='filterProfanity'
                                updated={(checked) => this.setStateWithProp('filterAccidentalProfanity', checked)}
                                value={this.state.generationOptions.filterAccidentalProfanity} />

                            <CheckboxComponent label='Allow Backwards Words'
                                name='allowBackwards'
                                updated={(checked) => this.setStateWithProp('allowBackwards', checked)}
                                value={this.state.generationOptions.allowBackwards} />

                            <CheckboxComponent label='Allow Overlaps'
                                name='allowOverlaps'
                                updated={(checked) => this.setStateWithProp('allowOverlaps', checked)}
                                value={this.state.generationOptions.allowOverlaps} />

                            {this.state.generationOptions.allowOverlaps ?
                                <CheckboxComponent label='Zealous Overlaps' name='zealousOverlaps'
                                    updated={(checked) => this.setStateWithProp('zealousOverlaps', checked)}
                                    value={this.state.generationOptions.zealousOverlaps} /> : null
                            }
                        </CardComponent>

                        <CardComponent title='Word List'>
                            <ReactInputListComponent
                                addSlotButtonText='Add Word Slot'
                                formProps={props}
                                validators={this.props.wordValidators}
                                changed={(inputs) => this.updateWords(inputs)} />
                        </CardComponent>

                        <CardComponent title='Output'>
                            <DropdownComponent label='Method' options={[]} updated={(value) => this.setState({ selectedOutputOption: value})} />
                        </CardComponent>

                        <div className='generate' onClick={() => this.generate()}>
                            <ButtonComponent color='primary' text='Generate' disabled={!props.dirty || !props.isValid} />
                        </div>
                    </Form>
                )}
            </Formik>
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

    updateWords(inputs: Array<Input<string>>) {
        this.setState({
            currentFormWords: inputs.map(input => input.value)
        });
        // TODO form shit
        // this.gameFormGroup.markAsDirty();
        // this.gameFormGroup.updateValueAndValidity();
    }
}
