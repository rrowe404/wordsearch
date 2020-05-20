import { Injectable } from '@angular/core';
import { StringUtilsModule } from './StringUtilsModule';

@Injectable({
    providedIn: StringUtilsModule
})
export class StringUtils {
    public reverseWord(word: string) {
        return word.split('').reverse().join('');
    }
}