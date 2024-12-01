import { createHTMLFragment } from '../src/client/js/formHandler.js'; // Adjust the import path

describe('createHTMLFragment', () => {
  test('should generate correct HTML fragment with valid data', () => {
    const index = 0;
    const entity = {
      matchedText: 'Test Match',
      confidenceScore: '95%',
      relevanceScore: '90%',
      wikiLink: 'https://en.wikipedia.org/wiki/Test_Match',
    };

    const result = createHTMLFragment(index, entity);

    // Check if the result contains the correct HTML structure
    expect(result).toContain('<tr>');
    expect(result).toContain(`<td>${index + 1}</td>`); // index + 1 = 1
    expect(result).toContain('<td>Test Match</td>');
    expect(result).toContain('<td>95%</td>');
    expect(result).toContain('<td>90%</td>');
  });


});
