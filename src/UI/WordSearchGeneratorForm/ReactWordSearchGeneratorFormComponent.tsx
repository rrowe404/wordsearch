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
import { connect } from 'react-redux';
import { ReduxState } from '../Redux/ReduxState';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchGenerationService } from 'src/Rules/WordSearchGeneration/WordSearchGenerationService';
import { WordValidationService } from 'src/Rules/WordValidation/WordValidationService';
import { WordSearchStateFactory } from 'src/Rules/WordSearchState/WordSearchStateFactory';
import { ReduxActions } from '../Redux/ReduxActions';
import './WordSearchGeneratorFormStyles.less';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';
import { MethodDropdown } from './MethodDropdown';
import outputOptions from './MethodDropdownOptions';

export class WordSearchGeneratorFormComponent extends React.Component<
  {},
  WordSearchGeneratorFormState
> {
  private wordSearchGenerationService = new WordSearchGenerationService();
  private wordSearchStateFactory = new WordSearchStateFactory();
  private wordValidationService = new WordValidationService();

  // todo type with wordValidators, words, dispatch
  constructor(public props) {
    super(props);

    this.state = {
      currentFormWords: [],
      generationOptions: {
        height: 30,
        width: 30,
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
        zealousOverlaps: false,
        outputOption: outputOptions[0].value,
      },
      wordValidator: (options: WordSearchGenerationOptions, value: string) => {
        let currentState =
          this.wordSearchStateFactory.createWordSearch(options);
        let errors = this.wordValidationService.getErrors(currentState, value);
        return Object.keys(errors)
          .map((error) => errors[error])
          .join('\n');
      },
    };
  }

  render() {
    let min = 5;
    let max = 30;
    let minMaxMessage = `(${min}-${max})`;

    const schema = yup.object({
      width: yup
        .number()
        .required('Required')
        .min(min, minMaxMessage)
        .max(max, minMaxMessage),
      height: yup
        .number()
        .required('Required')
        .min(min, minMaxMessage)
        .max(max, minMaxMessage),
      direction: yup
        .object()
        .test(
          'direction',
          'At least one direction must be selected!',
          function (value) {
            return (
              this.parent.allowHorizontal ||
              this.parent.allowVertical ||
              this.parent.allowDiagonal
            );
          }
        ),
      wordListLength: yup
        .object()
        .test('wordListLength', 'At least one word must be present!', () => {
          return this.props.words.length > 0;
        }),
    });

    // a couple of the fields like Columns and Rows can affect the validity of other fields if they are changed
    let revalidatingHandleChange = (
      e: React.ChangeEvent,
      props: FormikProps<any>
    ) => {
      props.handleChange(e);
      props.validateForm();
    };

    return (
      <div className='wordSearchGeneratorFormContainer'>
        <div className='wordSearchGeneratorForm'>
          <Formik
            initialValues={this.state.generationOptions}
            onSubmit={(values) => {
              this.generate(values);
            }}
            validationSchema={schema}
          >
            {(props) => (
              <Form>
                <CardComponent title='Word Search Generator'>
                  <CardComponent>
                    <InputComponent
                      label='Title'
                      name='title'
                      updated={props.handleChange}
                      value={props.values.title}
                    />
                  </CardComponent>

                  <CardComponent title='Size'>
                    <InputComponent
                      label='Columns'
                      name='width'
                      inputType='number'
                      updated={(e) => revalidatingHandleChange(e, props)}
                      value={props.values.width}
                    />

                    <InputComponent
                      label='Rows'
                      name='height'
                      inputType='number'
                      updated={(e) => revalidatingHandleChange(e, props)}
                      value={props.values.height}
                    />
                  </CardComponent>

                  <CardComponent title='Allowed Word Directions'>
                    <CheckboxComponent
                      label='Horizontal'
                      updated={props.handleChange}
                      name='allowHorizontal'
                      value={props.values.allowHorizontal}
                    />

                    <CheckboxComponent
                      label='Vertical'
                      updated={props.handleChange}
                      name='allowVertical'
                      value={props.values.allowVertical}
                    />

                    <CheckboxComponent
                      label='Diagonal'
                      updated={props.handleChange}
                      name='allowDiagonal'
                      value={props.values.allowDiagonal}
                    />

                    <CustomErrorMessage
                      name='direction'
                      errors={props.errors}
                    />
                  </CardComponent>

                  <CardComponent title='Misc. Options'>
                    <CheckboxComponent
                      label='Show Word List'
                      updated={props.handleChange}
                      name='showWordList'
                      value={props.values.showWordList}
                    />

                    {props.values.showWordList ? (
                      <CheckboxComponent
                        label='Alphabetize Word List'
                        updated={props.handleChange}
                        name='alphabetize'
                        value={props.values.alphabetizeWordList}
                      />
                    ) : null}

                    <CheckboxComponent
                      label='Filter Accidental Profanity'
                      updated={props.handleChange}
                      name='filterAccidentalProfanity'
                      value={props.values.filterAccidentalProfanity}
                    />

                    <CheckboxComponent
                      label='Allow Backwards Words'
                      updated={props.handleChange}
                      name='allowBackwards'
                      value={props.values.allowBackwards}
                    />

                    <CheckboxComponent
                      label='Allow Overlaps'
                      updated={props.handleChange}
                      name='allowOverlaps'
                      value={props.values.allowOverlaps}
                    />

                    {props.values.allowOverlaps ? (
                      <CheckboxComponent
                        label='Zealous Overlaps'
                        name='zealousOverlaps'
                        updated={props.handleChange}
                        value={props.values.zealousOverlaps}
                      />
                    ) : null}
                  </CardComponent>

                  <CardComponent title='Word List'>
                    <ReactInputListComponent
                      addSlotButtonText='Add Word Slot'
                      handleChange={props.handleChange}
                      updated={(words) => this.updateWords(words)}
                      validator={(value) =>
                        this.state.wordValidator(props.values, value)
                      }
                    />

                    {props.submitCount > 0 && (
                      <CustomErrorMessage
                        name='wordListLength'
                        errors={props.errors}
                      />
                    )}
                  </CardComponent>

                  <CardComponent title='Output'>
                    <MethodDropdown {...props} />
                  </CardComponent>

                  <ButtonComponent
                    buttonType='submit'
                    color='primary'
                    text='Generate'
                    disabled={!props.touched || !props.isValid}
                  />
                </CardComponent>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  generate(values: WordSearchGenerationOptions) {
    values.words = this.props.words;

    let result = this.wordSearchGenerationService.generateWordSearch(values);

    this.props.dispatch({
      type: ReduxActions.GenerateWordSearch,
      state: result,
    });
  }

  updateWords(words: string[]) {
    this.props.dispatch({ type: ReduxActions.SetWords, words });
  }
}

let mapStateToProps = (state: ReduxState) => ({
  words: state.words,
});

export const WordSearchGeneratorFormConnected = connect(mapStateToProps)(
  WordSearchGeneratorFormComponent
);
