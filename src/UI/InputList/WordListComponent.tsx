import * as React from 'react';
import { InputComponent } from '../Input/ReactInputComponent';
import './WordList.less';

interface Props {
  handleChange: (e: React.ChangeEvent) => void;
  value: string;
}

const WordListComponent: React.FC<Props> = ({ handleChange, value }) => {
  return (
    <div className='word-list'>
      <div className='word-list-container'>
        <InputComponent
          as='textarea'
          name='wordList'
          updated={handleChange}
          value={value}
        />
      </div>
    </div>
  );
};

export { WordListComponent };
