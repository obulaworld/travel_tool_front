import formatDate from '../formatDate';

test('formatdate() function', () => {
  const result = formatDate('2019/12/01');
  expect(result).toEqual('12/01/2019');
});
