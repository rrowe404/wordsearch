import * as React from 'react';
import { ButtonComponent } from '../Button/ReactButtonComponent';
import { InputComponent } from '../Input/ReactInputComponent';
import { InputListProps } from './InputListProps';
import { InputListState } from './InputListState';

export class ReactInputListComponent extends React.Component<{}, InputListState> {
    private inputCounter = 0;

    constructor(public props: InputListProps) {
        super(props);
        this.state = { inputs: [{name: this.getNextName() }] };
    }

    public getNextName() {
        return `input-${this.inputCounter++}`;
    }

    render() {
        return (
            <div>
                {this.state.inputs.map((input, i) => {
                    return ( <div>
                        <InputComponent name={input.name} key={input.name} validators={this.props.validators}
                            value='' updated={() => this.inputUpdated()} />

                        <button className='icon' onClick={(e) => this.removeSlot(e, i)}>✖</button>
                    </div> );
                })}

                <div onClick={() => this.addSlot()}>
                    <ButtonComponent text={this.props.addSlotButtonText} />
                </div>
            </div>
        );
    }

    public addSlot() {
        let inputs = this.state.inputs.slice();
        inputs.push({ name: this.getNextName() });

        this.setState({
            inputs
        });

        this.focusNewestInput();
    }

    public removeSlot(event, index: number) {
        let inputs = this.state.inputs.slice();
        inputs.splice(index, 1);

        this.setState({
            inputs
        });
    }

    public inputUpdated() {
        // do something amazing
    }

    private focusNewestInput() {
        // setTimeout(() => {
        //     this.inputFocusEventService.inputFocusEvent.emit(this.inputs[this.inputs.length - 1].name);
        // });
    }
}
