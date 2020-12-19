import * as React from 'react';
import * as yup from 'yup';
import { InputComponent } from '../Input/ReactInputComponent';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import * as _ from 'lodash';
import { CardComponent } from '../Card/ReactCardComponent';
import { CheckboxComponent } from '../Checkbox/ReactCheckboxComponent';
import { ButtonComponent } from '../Button/ReactButtonComponent';
import { WordSearchGeneratorFormProps } from './WordSearchGeneratorFormProps';
import { ReactInputListComponent } from '../InputList/ReactInputListComponent';
import { Form, Formik } from 'formik';
import { DropdownComponent } from '../Dropdown/ReactDropdownComponent';
import { PlayableWordSearchOutputStrategy } from '../WordSearchOutput/PlayableWordSearchOutputStrategy';
import { ImageWordSearchOutputStrategy } from '../WordSearchOutput/ImageWordSearchOutputStrategy';
import { environment } from 'src/environments/environment';
import { ConsoleWordSearchOutputStrategy } from '../WordSearchOutput/ConsoleWordSearchOutputStrategy';
import { connect } from 'react-redux';
import { ReduxState } from '../Redux/ReduxState';

export class WordSearchGeneratorFormComponent extends React.Component<{}, WordSearchGeneratorFormState> {
    // todo type with wordValidators, words, dispatch
    constructor(public props) {
        super(props);

        let outputOptions = [
            { value: PlayableWordSearchOutputStrategy.getValue(), viewValue: PlayableWordSearchOutputStrategy.getViewValue() },
            { value: ImageWordSearchOutputStrategy.getValue(), viewValue: ImageWordSearchOutputStrategy.getViewValue() }
        ];

        if (!environment.production) {
            outputOptions.push({
                value: ConsoleWordSearchOutputStrategy.getValue(),
                viewValue: ConsoleWordSearchOutputStrategy.getViewValue()
            });
        }

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
            selectedOutputOption: outputOptions[0].value
        };
    }

    render() {
        /** TODO directionFormGroup */
        /** TODO Generate button disabling */
        /** TODO setColumns/setRows update validity of words */
        /** TODO min max messages */

        const schema = yup.object({
            width: yup.number().required('Required').min(5).max(30),
            height: yup.number().required('Required').min(5).max(30)
        })

        return (
            <Formik initialValues={this.state.generationOptions} onSubmit={(values) => { this.generate(values) }} validationSchema={schema}>
                {props => (
                    <Form>
                        <InputComponent label='Title' name='title' updated={props.handleChange} value={props.values.title}/>

                        <CardComponent title='Allowed Word Directions'>
                            <CheckboxComponent label='Horizontal'
                                name='allowHorizontal'
                                value={props.values.allowHorizontal} />

                            <CheckboxComponent label='Vertical'
                                name='allowVertical'
                                value={props.values.allowVertical} />

                            <CheckboxComponent label='Diagonal'
                                name='allowDiagonal'
                                value={props.values.allowDiagonal}
                            />
                        </CardComponent>

                        <CardComponent title='Size'>
                            <InputComponent label='Columns' name='width' inputType='number' updated={props.handleChange} value={props.values.width}/>

                            <InputComponent label='Rows' name='height' inputType='number' updated={props.handleChange} value={props.values.height} />
                        </CardComponent>

                        <CardComponent title='Misc. Options'>
                            <CheckboxComponent label='Show Word List'
                                name='wordList'
                                value={props.values.showWordList} />

                            {props.values.showWordList ?
                                <CheckboxComponent label='Alphabetize Word List'
                                    name='alphabetize'
                                    value={props.values.alphabetizeWordList} /> : null
                            }

                            <CheckboxComponent label='Filter Accidental Profanity'
                                name='filterProfanity'
                                value={props.values.filterAccidentalProfanity} />

                            <CheckboxComponent label='Allow Backwards Words'
                                name='allowBackwards'
                                value={props.values.allowBackwards} />

                            <CheckboxComponent label='Allow Overlaps'
                                name='allowOverlaps'
                                value={props.values.allowOverlaps} />

                            {props.values.allowOverlaps ?
                                <CheckboxComponent label='Zealous Overlaps' name='zealousOverlaps'
                                    value={props.values.zealousOverlaps} /> : null
                            }
                        </CardComponent>

                        <CardComponent title='Word List'>
                            <ReactInputListComponent
                                addSlotButtonText='Add Word Slot'
                                updated={(words) => this.updateWords(words)}
                                validators={this.props.wordValidators} />
                        </CardComponent>

                        <CardComponent title='Output'>
                            <DropdownComponent label='Method' options={[]} updated={(value) => this.setState({ selectedOutputOption: value })} />
                        </CardComponent>

                        <ButtonComponent buttonType='submit' color='primary' text='Generate' />
                    </Form>
                )}
            </Formik>
        );
    }

    generate(values: any) {
        console.log(values);
        console.log(this.props.words);
    }

    updateWords(words: string[]) {
        this.props.dispatch({ type: 'SET_WORDS', words })
    }
}

let mapStateToProps = (state: ReduxState) => ({
    words: state.words
})

export const WordSearchGeneratorFormConnected = connect(mapStateToProps)(WordSearchGeneratorFormComponent);