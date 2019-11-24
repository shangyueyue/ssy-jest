const { obj } = require('../src/object');

test('src object', () => {
  expect(obj).toEqual({ age: 18 });
});
