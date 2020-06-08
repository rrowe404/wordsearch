export const enum WordPositionValidationResult {
    /**
     * The word can be placed over only placeholders
     */
    Clean = 'clean',

    /**
     * The word can be placed over placeholders and matching letters
     */
    Overlap = 'overlap',

    /**
     * The word cannot be placed
     */
    Invalid = 'invalid'
}
