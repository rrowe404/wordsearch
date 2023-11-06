import { ArrayGenerationService } from './ArrayGenerationService';

describe('ArrayGenerationService', () => {
  let service: ArrayGenerationService;

  beforeEach(() => {
    service = new ArrayGenerationService();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a matrix correctly', () => {
    const testFill = '!';
    const columns = 5;
    const rows = 4;
    const matrix = service.generateEmpty2dArray<string>(columns, rows, '!');

    expect(matrix.length).toBe(rows);
    expect(matrix.every((row) => row.length === columns));
    expect(matrix.every((row) => row.every((column) => column === testFill)));
  });
});
