import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { SizeTrackerResize } from './SizeTrackerResize';

interface SizeTrackerProps {
    children: any;
    className: string;
    onResize(event: SizeTrackerResize): void;
}

export const SizeTrackerComponent = (props: SizeTrackerProps) => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const ref = useRef(null);

    const handleResize = () => {
        let w = ref.current.clientWidth as number;
        let h = ref.current.clientHeight as number;
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
