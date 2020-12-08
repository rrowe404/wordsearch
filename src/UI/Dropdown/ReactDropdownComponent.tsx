import * as React from 'react';
import { LabelComponent } from '../Label/LabelComponent';
import { DropdownProps } from './DropdownProps';

export class DropdownComponent extends React.Component {
    constructor(public props: DropdownProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <LabelComponent label={this.props.label} />
            </div>
        );
    }
}
