const print = require('../src/print');

test('print结果', () => {
  expect(print(1, 2)).toBe('hello world');
});
