import * as React from 'react';
import { ErrorsProps } from './ErrorsProps';

export class ErrorsComponent extends React.Component {
    constructor(public props: ErrorsProps) {
        super(props);
    }

    render() {
        let keys = Object.keys(this.props.errors);

        return (
            keys.map(key => {
                return <span className='error' key={key}>{this.props.errors[key]}</span>;
            })
        );
    }

}
