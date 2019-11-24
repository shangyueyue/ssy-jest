const { bt, ft } = require('../src/boolean');

test('src boolean', () => {
  expect(bt).toBeTruthy();
  expect(ft).toBeFalsy();
});
