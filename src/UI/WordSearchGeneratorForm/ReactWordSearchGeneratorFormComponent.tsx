import * as React from 'react';
import * as yup from 'yup';
import { CardComponent } from '../Card/ReactCardComponent';
import { CheckboxComponent } from '../Checkbox/ReactCheckboxComponent';
import { Form, Formik } from 'formik';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
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
import { WordListComponent } from '../InputList/WordListComponent';
import { WordSearchOutputContext } from '../WordSearchOutputContext/WordSearchOutputContext';

const min = 5;
const max = 30;
const minMaxMessage = `(${min}-${max})`;

const WordSearchGeneratorForm: React.FC = () => {
  const { setWordSearchGenerationOptions } = React.useContext(
    WordSearchOutputContext
  );

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
    wordList: yup.string().required('At least one word must be present!'),
  });

  const generate = (values: WordSearchGenerationOptions) => {
    setWordSearchGenerationOptions(values);
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
                  <WordListComponent handleChange={props.handleChange} />
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

export { WordSearchGeneratorForm };
