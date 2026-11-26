import * as yup from 'yup';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { ImageWordSearchOutputStrategy } from '../WordSearchOutput/ImageWordSearchOutputStrategy';

const min = 5;
const max = 30;
const minMaxMessage = `(${min}-${max})`;

const WordSearchGeneratorFormSchema = yup.object({
  width: yup
    .number()
    .required('Required')
    .min(min, minMaxMessage)
    .max(max, minMaxMessage),
  height: yup
    .number()
    .required('Required')
    .min(min, minMaxMessage)
    .max(max, minMaxMessage),
  direction: yup
    .object()
    .test('direction', 'At least one direction must be selected!', function () {
      const parent = this.parent as WordSearchGenerationOptions;

      return (
        parent.allowHorizontal || parent.allowVertical || parent.allowDiagonal
      );
    }),
  wordList: yup.string().required('At least one word must be present!'),
  fontSize: yup.number().when('outputOption', {
    is: ImageWordSearchOutputStrategy.getValue(),
    then: (schema) => schema.required('Required').min(8).max(40),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export { WordSearchGeneratorFormSchema };
