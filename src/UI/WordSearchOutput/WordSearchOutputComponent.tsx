import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../Redux/ReduxState';

export class WordSearchOutputComponent extends React.Component {
    constructor(public props) {
        super(props);
    }

    render() {
        if (!this.props.wordSearchState) {
            return null;
        }

        return (
            <div key={this.props.wordSearchState}>
                {this.props.wordSearchState.outputOption}
            </div>
        )
    }
}

let mapStateToProps = (state: ReduxState) => ({
    wordSearchState: state.wordSearchState
});

export const WordSearchOutputConnected = connect(mapStateToProps)(WordSearchOutputComponent);