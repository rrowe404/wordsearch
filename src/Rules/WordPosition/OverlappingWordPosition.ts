import { WordPosition } from './WordPosition';

export interface OverlappingWordPosition extends WordPosition {
    overlaps?: boolean;
}
