import * as React from 'react';
import { connect } from 'react-redux';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { ReduxState } from '../Redux/ReduxState';
import { WordSearchOutputStrategyFactory } from './WordSearchOutputStrategyFactory';
import './WordSearchOutputStyles.less';

interface Props {
  wordSearchState: WordSearchState;
}

const wordSearchOutputStrategyFactory = new WordSearchOutputStrategyFactory();

const WordSearchOutputContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className='output'>{children}</div>;
};

const WordSearchOutputComponent: React.FC<Props> = ({ wordSearchState }) => {
  if (!wordSearchState) {
    return <WordSearchOutputContainer />;
  }

  const output = wordSearchOutputStrategyFactory.createOutputStrategy(
    wordSearchState.outputOption
  );
  const jsx = output.output(wordSearchState);

  return <WordSearchOutputContainer>{jsx}</WordSearchOutputContainer>;
};

const mapStateToProps = (state: ReduxState) => ({
  wordSearchState: state.wordSearchState,
});

export const WordSearchOutputConnected = connect(mapStateToProps)(
  WordSearchOutputComponent
);
