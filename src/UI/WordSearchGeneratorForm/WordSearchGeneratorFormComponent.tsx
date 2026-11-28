import * as React from 'react';
import { CardComponent } from '../Card/CardComponent';
import { CheckboxComponent } from '../Checkbox/CheckboxComponent';
import { Form, Formik } from 'formik';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
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
import {
  DefaultImageWordSearchGenerationOptions,
  DefaultWordSearchGenerationOptions,
} from './DefaultWordSearchGenerationOptions';
import { WordListComponent } from '../InputList/WordListComponent';
import { WordSearchOutputContext } from '../WordSearchOutputContext/WordSearchOutputContext';
import { ImageWordSearchOutputStrategy } from '../WordSearchOutput/ImageWordSearchOutputStrategy';
import { ImageFontSizeInput } from './ImageFontSizeInput';
import { WordSearchGeneratorFormSchema } from './WordSearchGeneratorFormSchema';

const WordSearchGeneratorForm: React.FC = () => {
  const { setWordSearchGenerationOptions } = React.useContext(
    WordSearchOutputContext
  );

  const generate = (values: WordSearchGeneratorFormState) => {
      setWordSearchGenerationOptions(values);
  };

  const wordListPopoverText = `
    Enter words, separated by new lines.
    Spaces and special characters will automatically be stripped.
    If a word is too long, or if the board is out of space, it will be discarded.
  `;

  return (
    <div className='wordSearchGeneratorForm'>
      <Formik<WordSearchGeneratorFormState>
        initialValues={{
          ...DefaultWordSearchGenerationOptions,
          ...DefaultImageWordSearchGenerationOptions,
        }}
        onSubmit={(values) => {
          generate(values);
        }}
        validationSchema={WordSearchGeneratorFormSchema}
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

                <CustomErrorMessage name='direction' errors={props.errors} />
              </CardComponent>

              <CardComponent title='Misc. Options'>
                <CheckboxComponent
                  label='Show Grid'
                  updated={props.handleChange}
                  name='showGrid'
                  value={props.values.showGrid}
                />

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
                <WordListComponent
                  handleChange={props.handleChange}
                  value={props.values.wordList}
                />
              </CardComponent>

              <CardComponent title='Output'>
                <MethodDropdown {...props} />
                {props.values.outputOption ===
                ImageWordSearchOutputStrategy.getValue() ? (
                  <ImageFontSizeInput
                    handleChange={props.handleChange}
                    value={props.values.fontSize}
                  />
                ) : null}
              </CardComponent>

              <SubmitButton {...props} />
            </CardComponent>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { WordSearchGeneratorForm };
