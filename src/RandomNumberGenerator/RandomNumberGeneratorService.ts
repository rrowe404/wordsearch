import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class RandomNumberGeneratorService {
    public generateRandomIntInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    public generateRandomIntWithMax(max: number) {
        return this.generateRandomIntInRange(0, max);
    }
}