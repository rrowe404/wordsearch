import * as _ from 'lodash';
import * as React from 'react';
import { ButtonComponent } from '../Button/ReactButtonComponent';
import { InputComponent } from '../Input/ReactInputComponent';
import { InputListProps } from './InputListProps';
import { InputListState } from './InputListState';
import './InputList.less';
import { Input } from '../Input/Input';

export class ReactInputListComponent extends React.Component<{}, InputListState> {
    private inputCounter = 0;

    constructor(public props: InputListProps) {
        super(props);
        this.state = { inputs: [{name: this.getNextName(), value: '' }] };
    }

    public getNextName() {
        return `input-${this.inputCounter++}`;
    }

    render() {
        return (
            <div className='inputList'>
                {this.state.inputs.map((input, i) => {
                    return ( <div key={input.name} className='input-list-container'>
                        <InputComponent autofocus={i > 0} name={input.name} updated={(e) => this.updated(e)}
                                        value={input.value} validate={(value) => this.props.validator(value)} />
                        <div className='icon' onClick={(e) => this.removeSlot(e, i)}>✖</div>
                    </div> );
                })}

                <div onClick={() => this.addSlot()}>
                    <ButtonComponent buttonType='button' text={this.props.addSlotButtonText} />
                </div>
            </div>
        );
    }

    public updated(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.handleChange(e);

        let inputs = this.state.inputs;
        let index = _.findIndex(inputs, (i: Input<string>) => i.name === e.target.name);
        let input = inputs[index];
        input.value = e.target.value;

        inputs.splice(index, 1, input);

        this.setState({
            inputs
        });

        this.props.updated(inputs.filter(val => !!val).map(i => i.value));
    }

    public addSlot() {
        let inputs = this.state.inputs.slice();
        inputs.push({ name: this.getNextName(), value: '' });

        this.setState({
            inputs
        });
    }

    public removeSlot(event, index: number) {
        let inputs = this.state.inputs.slice();
        inputs.splice(index, 1);

        this.setState({
            inputs
        });
    }
}
