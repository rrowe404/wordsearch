import { environment } from 'env/environment';
import { DropdownOption } from '../Dropdown/DropdownOption';
import { ConsoleWordSearchOutputStrategy } from '../WordSearchOutput/ConsoleWordSearchOutputStrategy';
import { ImageWordSearchOutputStrategy } from '../WordSearchOutput/ImageWordSearchOutputStrategy';
import { PlayableWordSearchOutputStrategy } from '../WordSearchOutput/PlayableWordSearchOutputStrategy';

const outputOptions: DropdownOption<string>[] = [
  {
    value: PlayableWordSearchOutputStrategy.getValue(),
    viewValue: PlayableWordSearchOutputStrategy.getViewValue(),
  },
  {
    value: ImageWordSearchOutputStrategy.getValue(),
    viewValue: ImageWordSearchOutputStrategy.getViewValue(),
  },
];

if (!environment.production) {
  outputOptions.push({
    value: ConsoleWordSearchOutputStrategy.getValue(),
    viewValue: ConsoleWordSearchOutputStrategy.getViewValue(),
  });
}

export default outputOptions;
