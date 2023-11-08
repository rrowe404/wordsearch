import * as React from 'react';
import * as yup from 'yup';
import { CardComponent } from '../Card/ReactCardComponent';
import { CheckboxComponent } from '../Checkbox/ReactCheckboxComponent';
import { WordListComponentConnected } from '../InputList/WordListComponent';
import { Form, Formik } from 'formik';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxState } from '../Redux/ReduxState';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchGenerationService } from 'src/Rules/WordSearchGeneration/WordSearchGenerationService';
import { ReduxActions } from '../Redux/ReduxActions';
import './WordSearchGeneratorFormStyles.less';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';
import { MethodDropdown } from './MethodDropdown';
import { SubmitButton } from './SubmitButton';
import { TitleInput } from './TitleInput';
import { ColumnsInput } from './ColumnsInput';
import { RowsInput } from './RowsInput';
import { HorizontalCheckbox } from './HorizontalCheckbox';
import { VerticalCheckbox } from './VerticalCheckbox';
import { DiagonalCheckbox } from './DiagonalCheckbox';
import { DefaultWordSearchGenerationOptions } from './DefaultWordSearchGenerationOptions';

const min = 5;
const max = 30;
const minMaxMessage = `(${min}-${max})`;
const wordSearchGenerationService = new WordSearchGenerationService();

interface StateProps {
  words: string[];
}

const mapStateToProps = (state: ReduxState) => ({
  words: state.words,
});

const connector = connect<StateProps>(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const WordSearchGeneratorForm: React.FC<Props> = ({ dispatch, words }) => {
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
        function () {
          const parent = this.parent as WordSearchGenerationOptions;

          return (
            parent.allowHorizontal ||
            parent.allowVertical ||
            parent.allowDiagonal
          );
        }
      ),
    wordListLength: yup
      .object()
      .test('wordListLength', 'At least one word must be present!', () => {
        return words.length > 0;
      }),
  });

  const generate = (values: WordSearchGenerationOptions) => {
    values.words = words;

    const result = wordSearchGenerationService.generateWordSearch(values);

    dispatch({
      type: ReduxActions.GenerateWordSearch,
      state: result,
    });
  };

  const wordListPopoverText = `
    Enter words, separated by new lines.
    Spaces and special characters will automatically be stripped.
    If a word is too long, or if the board is out of space, it will be discarded.
  `;

  return (
    <div className='wordSearchGeneratorFormContainer'>
      <div className='wordSearchGeneratorForm'>
        <Formik
          initialValues={DefaultWordSearchGenerationOptions}
          onSubmit={(values) => {
            generate(values);
          }}
          validationSchema={schema}
        >
          {(props) => (
            <Form>
              <CardComponent title='Word Search Generator'>
                <CardComponent>
                  <TitleInput {...props} />
                </CardComponent>

                <CardComponent title='Size'>
                  <ColumnsInput {...props} />
                  <RowsInput {...props} />
                </CardComponent>

                <CardComponent title='Allowed Word Directions'>
                  <HorizontalCheckbox {...props} />
                  <VerticalCheckbox {...props} />
                  <DiagonalCheckbox {...props} />

                  <CustomErrorMessage
                    name='direction'
                    errors={{
                      direction: props.errors['direction'] as string,
                    }}
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

                <CardComponent
                  title='Word List'
                  popoverText={wordListPopoverText}
                >
                  <WordListComponentConnected
                    handleChange={props.handleChange}
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

                <SubmitButton {...props} />
              </CardComponent>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const WordSearchGeneratorFormConnected = connector(WordSearchGeneratorForm);
export { WordSearchGeneratorFormConnected };
