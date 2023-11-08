class InputSanitizer {
  sanitize(input: string): string {
    return input.replaceAll(/[^\w]+/g, '');
  }
}

export { InputSanitizer };
