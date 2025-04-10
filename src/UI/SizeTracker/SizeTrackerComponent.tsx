import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { SizeTrackerResize } from './SizeTrackerResize';

interface SizeTrackerProps extends React.PropsWithChildren {
  className: string;
  onResize(event: SizeTrackerResize): void;
}

export const SizeTrackerComponent = (props: SizeTrackerProps) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const w = ref.current.clientWidth;
    const h = ref.current.clientHeight;
    setHeight(h);
    setWidth(w);
    props.onResize({ height, width });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div className={props.className} ref={ref}>
      {props.children}
    </div>
  );
};
