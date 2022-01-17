/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
import User from '../models/User';

test('it should be great', () => {
  const user = new User('Johnny', 30);
  // console.log(user);
  expect(user.name).toBe('Johnny');
});
