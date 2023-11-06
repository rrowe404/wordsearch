export class RandomNumberGeneratorService {
  public flipACoin() {
    const flip = this.generateRandomIntWithMax(2);

    return flip % 2 === 0;
  }

  public generateRandomIntInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public generateRandomIntWithMax(max: number) {
    return this.generateRandomIntInRange(0, max);
  }

  public getRandomValueFrom<T>(array: T[]): T {
    return array[this.generateRandomIntWithMax(array.length)];
  }
}
