import * as React from 'react';
import { useEffect, useRef } from 'react';
import { SizeTrackerResize } from './SizeTrackerResize';

interface SizeTrackerProps extends React.PropsWithChildren {
  className: string;
  onResize(event: SizeTrackerResize): void;
}

export const SizeTrackerComponent = (props: SizeTrackerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const w = ref.current.clientWidth;
    const h = ref.current.clientHeight;
    props.onResize({ height: h, width: w });
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
