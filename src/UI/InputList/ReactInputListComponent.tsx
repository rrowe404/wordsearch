import * as _ from 'lodash';
import * as React from 'react';
import { ButtonComponent } from '../Button/ReactButtonComponent';
import { InputComponent } from '../Input/ReactInputComponent';
import { InputListProps } from './InputListProps';
import './InputList.less';
import { Input } from '../Input/Input';

const InputListComponent: React.FC<InputListProps> = ({
  addSlotButtonText,
  handleChange,
  updated,
  validator,
}) => {
  const inputCounter = React.useRef(0);
  const getNextName = () => `input-${inputCounter.current++}`;
  const [inputs, setInputs] = React.useState<Array<Input<string>>>([
    { name: getNextName(), value: '' },
  ]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);

    let index = _.findIndex(
      inputs,
      (i: Input<string>) => i.name === e.target.name
    );
    const inputsCopy = [...inputs];
    let input = inputsCopy[index];
    input.value = e.target.value;

    inputsCopy.splice(index, 1, input);

    setInputs(inputsCopy);

    updated(inputs.filter((val) => !!val).map((i) => i.value));
  };

  const addSlot = () => {
    let inputsCopy = [...inputs];
    inputsCopy.push({ name: getNextName(), value: '' });

    setInputs(inputsCopy);
  };

  const removeSlot = (event, index: number) => {
    let inputsCopy = [...inputs];
    inputsCopy.splice(index, 1);

    setInputs(inputsCopy);

    updated(inputsCopy.map((i) => i.value));
  };

  return (
    <div className='inputList'>
      {inputs.map((input, i) => {
        return (
          <div key={input.name} className='input-list-container'>
            <InputComponent
              autofocus={i > 0}
              name={input.name}
              updated={(e) => handleUpdate(e)}
              value={input.value}
              validate={(value) => validator(value)}
            />
            <div className='icon' onClick={(e) => removeSlot(e, i)}>
              ✖
            </div>
          </div>
        );
      })}

      <div onClick={() => addSlot()}>
        <ButtonComponent buttonType='button' text={addSlotButtonText} />
      </div>
    </div>
  );
};

export { InputListComponent as ReactInputListComponent };
