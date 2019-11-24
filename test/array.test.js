const { arr1, arr2 } = require('../src/array');

describe('array test', () => {
  test('arr1', () => {
    expect(arr1).toEqual([1, 2]);
    expect(arr1).toContain(1);
  });
  test('arr2', () => {
    expect(arr2).toContainEqual({ name: 'shangyy' });
  });
});
