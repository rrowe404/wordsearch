import * as React from 'react';
import { InputComponent } from '../Input/ReactInputComponent';
import './WordList.less';

interface Props {
  handleChange: (e: React.ChangeEvent) => void;
}

const WordListComponent: React.FC<Props> = ({ handleChange }) => {
  const [value, setValue] = React.useState('');
  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);

    const value = e.target.value;
    setValue(value);
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

export { WordListComponent };
