import { ArrayGenerationService } from 'src/Rules/ArrayGeneration/ArrayGenerationService';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';

const arrayGenerationService = new ArrayGenerationService();

const generateIndexArray = (length: number) => {
  return arrayGenerationService.generateEmptyArray(length).map((value, i) => i);
};

const getSize = (state: WordSearchState) => {
  return {
    rows: generateIndexArray(state.rows),
    columns: generateIndexArray(state.columns),
  };
};

export { getSize };
