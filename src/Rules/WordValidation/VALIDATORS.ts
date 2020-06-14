import { InjectionToken } from '@angular/core';
import { WordValidator } from './WordValidator';

export const VALIDATORS = new InjectionToken<WordValidator>('WordValidator');
