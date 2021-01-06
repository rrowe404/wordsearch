import * as React from 'react';

export class LabelComponent extends React.Component {
    constructor(public props) {
        super(props);
    }

    render() {
        if (!this.props.label) {
            return null;
        }

        return ( <label>{this.props.label}</label> );
    }
}
