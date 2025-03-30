import * as React from 'react';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

interface TitleProps {
  ref: React.RefObject<HTMLDivElement>;
}

const Title: React.FC<TitleProps> = ({ ref }) => {
  const { wordSearchState } = React.useContext(PlayableWordSearchContext);
  const { title } = wordSearchState;

  if (!title) {
    return null;
  }

  return <div className='title' ref={ref}>{title}</div>;
};

export { Title };
