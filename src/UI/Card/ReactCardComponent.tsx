import * as React from 'react';
import { CardProps } from './CardProps';

export const CardComponent: React.FunctionComponent<CardProps> = (props: React.PropsWithChildren<CardProps>) => (
    <div className='card'>
        <div className='card-title'>
            {props.title}
        </div>
        <div className='card-content'>
            {props.children}
        </div>
    </div>
);
