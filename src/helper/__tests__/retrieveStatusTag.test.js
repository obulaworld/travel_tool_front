import retrieveStatusTag from '../retrieveStatusTag';

const data = {};

test('it should return correct status tag', () => {
  const resultOne = retrieveStatusTag(data);
  expect(resultOne).toBe('Manager Stage');

  data.status = 'Approved';
  const resultTwo = retrieveStatusTag(data);
  expect(resultTwo).toBe('Travel Stage');

  data.status = 'Verified';
  const resultThree = retrieveStatusTag(data);
  expect(resultThree).toBe('Verified Stage');
});
