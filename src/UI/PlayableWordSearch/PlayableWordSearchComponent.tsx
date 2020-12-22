import * as React from 'react';
import { WordSearchState } from "src/Rules/WordSearchState/WordSearchState";

interface PlayableWordSearchProps {
    state: WordSearchState;
}

export class PlayableWordSearchComponent extends React.Component {
    constructor(public props: PlayableWordSearchProps) {
        super(props)
    }

    render() {
        return (
            <div className='playable'>
                <div className='title'>{this.props.state.title}</div>
            </div>
        )
    }

}