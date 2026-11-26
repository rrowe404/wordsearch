import { WordSearchGeneratorFormSchema } from './WordSearchGeneratorFormSchema';
import { WordSearchOutputOption } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';

const validOptions = {
  width: 10,
  height: 10,
  allowHorizontal: true,
  allowVertical: false,
  allowDiagonal: false,
  wordList: 'word',
};

describe('WordSearchGeneratorFormSchema', () => {
  it('does not require a font size for playable output', async () => {
    await expect(
      WordSearchGeneratorFormSchema.validate({
        ...validOptions,
        outputOption: WordSearchOutputOption.Playable,
      })
    ).resolves.toBeDefined();
  });

  it('requires a valid font size for image output', async () => {
    await expect(
      WordSearchGeneratorFormSchema.validate({
        ...validOptions,
        outputOption: WordSearchOutputOption.Image,
      })
    ).rejects.toThrow('Required');

    await expect(
      WordSearchGeneratorFormSchema.validate({
        ...validOptions,
        outputOption: WordSearchOutputOption.Image,
        fontSize: 41,
      })
    ).rejects.toThrow();
  });
});
