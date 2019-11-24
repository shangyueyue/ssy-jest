const { sum, minus } = require('../src/sum');

describe('测试src sum', () => {
  test('测试sum not 结果', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe('测试src sum', () => {
  test('测试minus 结果', () => {
    expect(minus(1, 1)).toBe(0);
  });
});
