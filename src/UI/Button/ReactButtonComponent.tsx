import * as React from 'react';
import { ButtonProps } from './ButtonProps';

export class ButtonComponent extends React.Component {
    private color: string;

    constructor(public props: ButtonProps) {
        super(props);

        this.color = props.color || 'primary';
    }

    render() {
        return (<button type={this.props.buttonType} className={this.color} disabled={this.props.disabled}>{this.props.text}</button>);
    }
}
