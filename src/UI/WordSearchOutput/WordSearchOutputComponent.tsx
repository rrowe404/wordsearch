import * as React from 'react';
import { WordSearchGenerationService } from 'src/Rules/WordSearchGeneration/WordSearchGenerationService';
import { WordSearchOutputContext } from '../WordSearchOutputContext/WordSearchOutputContext';
import { WordSearchOutputStrategyFactory } from './WordSearchOutputStrategyFactory';
import './WordSearchOutputStyles.less';

const wordSearchGenerationService = new WordSearchGenerationService();
const wordSearchOutputStrategyFactory = new WordSearchOutputStrategyFactory();

const WordSearchOutputContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className='output'>{children}</div>;
};

const WordSearchOutput: React.FC = () => {
  const { wordSearchGenerationOptions } = React.useContext(
    WordSearchOutputContext
  );
  if (!wordSearchGenerationOptions) {
    return <WordSearchOutputContainer />;
  }

  const wordSearchState = wordSearchGenerationService.generateWordSearch(
    wordSearchGenerationOptions
  );

  const output = wordSearchOutputStrategyFactory.createOutputStrategy(
    wordSearchState.outputOption
  );
  const jsx = output.output(wordSearchState);

  return <WordSearchOutputContainer>{jsx}</WordSearchOutputContainer>;
};

export { WordSearchOutput };
