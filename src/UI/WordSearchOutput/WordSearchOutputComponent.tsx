import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../Redux/ReduxState';
import { WordSearchOutputStrategyFactory } from './WordSearchOutputStrategyFactory';

export class WordSearchOutputComponent extends React.Component {
    private wordSearchOutputStrategyFactory = new WordSearchOutputStrategyFactory();

    constructor(public props) {
        super(props);
    }

    render() {
        if (!this.props.wordSearchState) {
            return null;
        }

        let output = this.wordSearchOutputStrategyFactory.createOutputStrategy(this.props.wordSearchState.outputOption);
        output.output(this.props.wordSearchState);

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