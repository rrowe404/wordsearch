export class ElementRemovalService {
    removeAll<T extends Element>(elements: HTMLCollectionOf<T>) {
        // loop backwards since HTMLCollectionOf is a live list
        for (let i = elements.length - 1; i >= 0; --i) {
            elements[i].remove();
        }
    }
}
