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

  if (!wordSearchState.wordList.length) {
    return (
      <WordSearchOutputContainer>
        <div role='alert'>
          No words could be placed. Try using shorter words or increasing the
          grid size.
        </div>
      </WordSearchOutputContainer>
    );
  }

  const output = wordSearchOutputStrategyFactory.createOutputStrategy(
    wordSearchState.outputOption
  );
  const jsx = output.output(wordSearchState);

  return <WordSearchOutputContainer>{jsx}</WordSearchOutputContainer>;
};

export { WordSearchOutput };
