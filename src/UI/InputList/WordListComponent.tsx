import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { InputSanitizer } from 'src/Rules/InputSanitizer/InputSanitizer';
import { InputComponent } from '../Input/ReactInputComponent';
import { ReduxActions } from '../Redux/ReduxActions';
import './WordList.less';

const connector = connect();

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props {
  handleChange: (e: React.ChangeEvent) => void;
}

const WordListComponent: React.FC<Props & PropsFromRedux> = ({
  dispatch,
  handleChange,
}) => {
  const [value, setValue] = React.useState('');
  const updateWords = (updatedWords: string[]) => {
    dispatch({ type: ReduxActions.SetWords, words: updatedWords });
  };
  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);

    const value = e.target.value;
    setValue(value);

    const sanitizer = new InputSanitizer();
    const words: string[] = value
      .split('\n')
      .map((word) => sanitizer.sanitize(word));
    updateWords(words);
  };

  return (
    <div className='word-list'>
      <div className='word-list-container'>
        <InputComponent
          as='textarea'
          autofocus={true}
          name='wordList'
          updated={(e) => handleUpdate(e)}
          value={value}
        />
      </div>
    </div>
  );
};

const WordListComponentConnected = connector(WordListComponent);
export { WordListComponentConnected };
