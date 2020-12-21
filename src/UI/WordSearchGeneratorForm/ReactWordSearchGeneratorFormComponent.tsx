import * as React from 'react';
import * as yup from 'yup';
import { InputComponent } from '../Input/ReactInputComponent';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import * as _ from 'lodash';
import { CardComponent } from '../Card/ReactCardComponent';
import { CheckboxComponent } from '../Checkbox/ReactCheckboxComponent';
import { ButtonComponent } from '../Button/ReactButtonComponent';
import { ReactInputListComponent } from '../InputList/ReactInputListComponent';
import { Form, Formik, FormikProps } from 'formik';
import { DropdownComponent } from '../Dropdown/ReactDropdownComponent';
import { PlayableWordSearchOutputStrategy } from '../WordSearchOutput/PlayableWordSearchOutputStrategy';
import { ImageWordSearchOutputStrategy } from '../WordSearchOutput/ImageWordSearchOutputStrategy';
import { environment } from 'src/environments/environment';
import { ConsoleWordSearchOutputStrategy } from '../WordSearchOutput/ConsoleWordSearchOutputStrategy';
import { connect } from 'react-redux';
import { ReduxState } from '../Redux/ReduxState';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchGenerationService } from 'src/Rules/WordSearchGeneration/WordSearchGenerationService';
import { WordValidationService } from 'src/Rules/WordValidation/WordValidationService';
import { WordSearchStateFactory } from 'src/Rules/WordSearchState/WordSearchStateFactory';

export class WordSearchGeneratorFormComponent extends React.Component<{}, WordSearchGeneratorFormState> {
    private wordSearchGenerationService = new WordSearchGenerationService();
    private wordSearchStateFactory = new WordSearchStateFactory();
    private wordValidationService = new WordValidationService();

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
            selectedOutputOption: outputOptions[0].value,
            wordValidator: (options: WordSearchGenerationOptions, value: string) => {
                let currentState = this.wordSearchStateFactory.createWordSearch(options);
                let errors = this.wordValidationService.getErrors(currentState, value);
                return Object.keys(errors).map(error => errors[error]).join('\n');
            }
        };
    }

    render() {
        let min = 5;
        let max = 30;
        let minMaxMessage = `(${min}-${max})`

        const schema = yup.object({
            width: yup.number().required('Required').min(min, minMaxMessage).max(max, minMaxMessage),
            height: yup.number().required('Required').min(min, minMaxMessage).max(max, minMaxMessage),
            direction: yup.object().test('direction', 'At least one direction must be selected!', function (value) {
                return this.parent.allowHorizontal || this.parent.allowVertical || this.parent.allowDiagonal
            }),
            wordListLength: yup.object().test('wordListLength', 'At least one word must be present!', () => {
                return this.props.words.length > 0;
            })
        });

        // a couple of the fields like Columns and Rows can affect the validity of other fields if they are changed
        let revalidatingHandleChange = (e: React.ChangeEvent, props: FormikProps<any>) => {
            props.handleChange(e);
            props.validateForm();
        }

        return (
            <Formik initialValues={this.state.generationOptions} onSubmit={(values) => { this.generate(values) }} validationSchema={schema}>
                {props => (
                    <Form>
                        <InputComponent label='Title' name='title' updated={props.handleChange} value={props.values.title} />

                        <CardComponent title='Allowed Word Directions'>
                            <CheckboxComponent label='Horizontal'
                                updated={props.handleChange}
                                name='allowHorizontal'
                                value={props.values.allowHorizontal} />

                            <CheckboxComponent label='Vertical'
                                updated={props.handleChange}
                                name='allowVertical'
                                value={props.values.allowVertical} />

                            <CheckboxComponent label='Diagonal'
                                updated={props.handleChange}
                                name='allowDiagonal'
                                value={props.values.allowDiagonal}
                            />

                            {props.errors['direction'] ? <div className='error'>{props.errors['direction']}</div> : null}
                        </CardComponent>

                        <CardComponent title='Size'>
                            <InputComponent label='Columns' name='width' inputType='number' updated={(e) => revalidatingHandleChange(e, props)} value={props.values.width} />

                            <InputComponent label='Rows' name='height' inputType='number' updated={(e) => revalidatingHandleChange(e, props)} value={props.values.height} />
                        </CardComponent>

                        <CardComponent title='Misc. Options'>
                            <CheckboxComponent label='Show Word List'
                                updated={props.handleChange}
                                name='wordList'
                                value={props.values.showWordList} />

                            {props.values.showWordList ?
                                <CheckboxComponent label='Alphabetize Word List'
                                    updated={props.handleChange}
                                    name='alphabetize'
                                    value={props.values.alphabetizeWordList} /> : null
                            }

                            <CheckboxComponent label='Filter Accidental Profanity'
                                updated={props.handleChange}
                                name='filterProfanity'
                                value={props.values.filterAccidentalProfanity} />

                            <CheckboxComponent label='Allow Backwards Words'
                                updated={props.handleChange}
                                name='allowBackwards'
                                value={props.values.allowBackwards} />

                            <CheckboxComponent label='Allow Overlaps'
                                updated={props.handleChange}
                                name='allowOverlaps'
                                value={props.values.allowOverlaps} />

                            {props.values.allowOverlaps ?
                                <CheckboxComponent label='Zealous Overlaps' name='zealousOverlaps'
                                    updated={props.handleChange}
                                    value={props.values.zealousOverlaps} /> : null
                            }
                        </CardComponent>

                        <CardComponent title='Word List'>
                            <ReactInputListComponent
                                addSlotButtonText='Add Word Slot'
                                handleChange={props.handleChange}
                                updated={(words) => this.updateWords(words)}
                                validator={(value) => this.state.wordValidator(props.values, value)} />

                            {props.errors['wordListLength'] ? <div className='error'>{props.errors['wordListLength']}</div> : null}
                        </CardComponent>

                        <CardComponent title='Output'>
                            <DropdownComponent label='Method' options={[]} updated={(value) => this.setState({ selectedOutputOption: value })} />
                        </CardComponent>

                        <ButtonComponent buttonType='submit' color='primary' text='Generate' disabled={!props.touched || !props.isValid}/>

                        {Object.keys(props.errors).map(key => key)}
                    </Form>
                )}
            </Formik>
        );
    }

    generate(values: WordSearchGenerationOptions) {
        values.words = this.props.words;

        let result = this.wordSearchGenerationService.generateWordSearch(values);
        console.log(result);

        // TODO output strategy
    }

    updateWords(words: string[]) {
        this.props.dispatch({ type: 'SET_WORDS', words })
    }
}

let mapStateToProps = (state: ReduxState) => ({
    words: state.words
})

export const WordSearchGeneratorFormConnected = connect(mapStateToProps)(WordSearchGeneratorFormComponent);