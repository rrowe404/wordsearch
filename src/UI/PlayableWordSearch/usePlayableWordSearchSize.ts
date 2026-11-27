import * as React from 'react';
import { SizeTrackerResize } from '../SizeTracker/SizeTrackerResize';

// these are kinda magical, just numbers that feel good
export const MIN_LETTER_SIZE = 10;
export const MAX_LETTER_SIZE = 50;

interface PlayableWordSearchSizeOptions {
  columns: number;
  titleRef: React.RefObject<HTMLDivElement | null>;
  wordListRef: React.RefObject<HTMLDivElement | null>;
}

interface MeasuredSize {
  letterSize: number;
  tableWidth: number;
}

const usePlayableWordSearchSize = ({
  columns,
  titleRef,
  wordListRef,
}: PlayableWordSearchSizeOptions) => {
  const [measuredSize, setMeasuredSize] =
    React.useState<MeasuredSize>({ letterSize: 0, tableWidth: 0 });

  const onResize = React.useCallback(
    (resize: SizeTrackerResize) => {
      // gotta fit, so take the smaller of the two
      let basis = Math.floor(Math.min(resize.width, resize.height));

      // if the height is what is restricting us, we need to account for title/wordlist height too
      if (basis === Math.floor(resize.height)) {
        const titleHeight = titleRef.current?.clientHeight ?? 0;
        const wordListHeight = wordListRef.current?.clientHeight ?? 0;
        basis -= titleHeight + wordListHeight;
      }

      let newLetterSize = Math.floor(basis / columns);

      // max size
      newLetterSize = Math.min(newLetterSize, MAX_LETTER_SIZE);

      // normalize
      newLetterSize = Math.max(newLetterSize, MIN_LETTER_SIZE);

      // in this case, the table doesn't need the whole space to render
      // so we need to recalculate the basis to make the width is correct
      if (newLetterSize === MAX_LETTER_SIZE) {
        basis = newLetterSize * columns;
      }

      setMeasuredSize((currentSize) => {
        if (
          currentSize.letterSize === newLetterSize &&
          currentSize.tableWidth === basis
        ) {
          return currentSize;
        }

        return {
          letterSize: newLetterSize,
          tableWidth: basis,
        };
      });
    },
    [columns]
  );

  return {
    letterSize: measuredSize.letterSize,
    tableWidth: measuredSize.tableWidth,
    onResize,
  };
};

export { usePlayableWordSearchSize };
