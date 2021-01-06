import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { HorizontalWordSearchStateSlicer } from '../WordSearchStateSlicer/HorizontalWordSearchStateSlicer';
import { VerticalWordSearchStateSlicer } from '../WordSearchStateSlicer/VerticalWordSearchStateSlicer';
import { TopLeftToBottomRightDiagonalWordSearchStateSlicer } from '../WordSearchStateSlicer/TopLeftToBottomRightDiagonalWordSearchStateSlicer';
import { BottomLeftToTopRightDiagonalWordSearchStateSlicer } from '../WordSearchStateSlicer/BottomLeftToTopRightDiagonalWordSearchStateSlicer';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';
import { WordSearchStateSlicer } from '../WordSearchStateSlicer/WordSearchStateSlicer';

export class ProfanityFilterService {
    private slicers: WordSearchStateSlicer[] = [
        new HorizontalWordSearchStateSlicer(),
        new VerticalWordSearchStateSlicer(),
        new TopLeftToBottomRightDiagonalWordSearchStateSlicer(),
        new BottomLeftToTopRightDiagonalWordSearchStateSlicer()
    ];

    // Word list borrowed from http://www.bannedwordlist.com/lists/swearWords.txt and modified a bit to catch more racial slurs
    // and remove some that don't make sense to filter in this context
    private profanity: string[] = [
        'anal',
        'anus',
        'arse',
        'ass',
        'balls',
        'bastard',
        'beaner',
        'bitch',
        'biatch',
        'blowjob',
        'blow job',
        'bollock',
        'bollok',
        'boner',
        'boob',
        'bugger',
        'bum',
        'butt',
        'buttplug',
        'chink',
        'clitoris',
        'cock',
        'coon',
        'crap',
        'cunt',
        'dago',
        'damn',
        'dick',
        'dildo',
        'dyke',
        'fag',
        'feck',
        'fellate',
        'fellatio',
        'felching',
        'fuck',
        'fudgepacker',
        'fudge packer',
        'flange',
        'Goddamn',
        'God damn',
        'gook',
        'gyp',
        'hell',
        'homo',
        'jap',
        'jerk',
        'jizz',
        'kkk',
        'knobend',
        'knob end',
        'labia',
        'lmao',
        'lmfao',
        'muff',
        'nig',
        'omg',
        'penis',
        'piss',
        'poop',
        'prick',
        'pube',
        'pussy',
        'queer',
        'scrotum',
        'sex',
        'shit',
        'slut',
        'spic',
        'smegma',
        'spunk',
        'tit',
        'tosser',
        'turd',
        'twat',
        'vagina',
        'wank',
        'wetback',
        'whore',
        'wtf'
    ];

    public setProfanityList(list: string[]) {
        this.profanity = list;
    }

    /**
     * This removes the letters belonging to profane words but does NOT fill them back in. Do that in LetterPlaceholderFillService!
     * @returns whether or not anything was replaced
     */
    public filterProfanity(currentState: WordSearchState, userPlacedLetters: LetterWithPosition[]) {
        let arr = currentState.getLettersWithPositions();

        let slices = this.slicers.map(slicer => slicer.createSlice(currentState, arr));

        let didAnything = false;

        slices.forEach(slice => {
            slice.forEach(subslice => {
                let didAnythingForSubslice = this.replaceProfanityInSubSlice(currentState, subslice, userPlacedLetters);

                if (didAnythingForSubslice) {
                    didAnything = true;
                }
            });
        });

        return didAnything;
    }

    private replaceProfanityInSubSlice(
        currentState: WordSearchState,
        subslice: LetterWithPosition[],
        userPlacedLetters: LetterWithPosition[]
    ) {
        let str = subslice.map(x => x.letter).join('');
        let didAnything = false;

        let replace = () => this.profanity.forEach(curse => {
            let index = str.indexOf(curse);

            if (index === -1) {
                return;
            } else {
                let letters = subslice.slice(index, curse.length);

                letters.forEach(lwp => {
                    if (!userPlacedLetters.filter(upl => lwp.column === upl.column && lwp.row === upl.row).length) {
                        currentState.setValueAt(lwp.row, lwp.column, LetterPlaceholder.value);
                        didAnything = true;
                    }
                });
            }
        });

        replace();
        str = subslice.reverse().map(x => x.letter).join('');
        replace();

        return didAnything;
    }
}
