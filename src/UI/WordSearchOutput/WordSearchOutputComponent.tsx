import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../Redux/ReduxState';
import { WordSearchOutputStrategyFactory } from './WordSearchOutputStrategyFactory';
import './WordSearchOutputStyles.less';

export class WordSearchOutputComponent extends React.Component {
    private wordSearchOutputStrategyFactory = new WordSearchOutputStrategyFactory();

    constructor(public props) {
        super(props);
    }

    render() {
        if (!this.props.wordSearchState) {
            return this.outputContainer(null);
        }

        let output = this.wordSearchOutputStrategyFactory.createOutputStrategy(this.props.wordSearchState.outputOption);
        let jsx = output.output(this.props.wordSearchState);

        return this.outputContainer(jsx);
    }

    private outputContainer(content: JSX.Element) {
        return (
            <div className='output' key={this.props.wordSearchState}>
                {content}
            </div>
        );
    }
}

let mapStateToProps = (state: ReduxState) => ({
    wordSearchState: state.wordSearchState
});

export const WordSearchOutputConnected = connect(mapStateToProps)(WordSearchOutputComponent);
