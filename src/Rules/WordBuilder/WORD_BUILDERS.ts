import { InjectionToken } from '@angular/core';
import { WordBuilder } from './WordBuilder';

export const WORD_BUILDERS = new InjectionToken<WordBuilder>('WordBuilder');
