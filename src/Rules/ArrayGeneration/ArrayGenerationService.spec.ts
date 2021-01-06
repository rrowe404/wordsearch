import { ArrayGenerationService } from './ArrayGenerationService';

describe('ArrayGenerationService', () => {
    let service: ArrayGenerationService;

    beforeEach(() => {
        service = new ArrayGenerationService();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it ('should generate a matrix correctly', () => {
        let testFill = '!';
        let columns = 5;
        let rows = 4;
        let matrix = service.generateEmpty2dArray(columns, rows, '!');

        expect(matrix.length).toBe(rows);
        expect(matrix.every(row => row.length === columns));
        expect(matrix.every(row => row.every(column => column === testFill)));
    });
});
