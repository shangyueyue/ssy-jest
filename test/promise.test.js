
const func = require('../src/promise');

describe('promise test', () => {
  // test('func reject', () => expect(func()).rejects.toEqual(new Error('error')));
  // // test('func  reject', () => expect(func()).rejects.toBe());
  // test('func resolve', () => func().then((data) => {
  //   expect(data).toBe('resolve');
  // }, (e) => {
  //   expect(e).toEqual(new Error('error'));
  // }));
  test('func async await', async () => {
    expect.assertions(1);
    try {
      await func();
    } catch (error) {
      expect(error.message).toMatch('error');
    }
  });
});
