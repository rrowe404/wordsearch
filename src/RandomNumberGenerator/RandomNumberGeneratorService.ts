import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class RandomNumberGeneratorService {
    public generateRandomIntInRange(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}