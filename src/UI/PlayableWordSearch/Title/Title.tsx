import * as React from 'react';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

const Title: React.FC = () => {
  const { wordSearchState } = React.useContext(PlayableWordSearchContext);
  const { title } = wordSearchState;

  return <div className='title'>{title}</div>;
};

export { Title };
