/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

// import request from 'supertest';
// import makeApp from '../server';

// const createUser = jest.fn();

// const app = makeApp({
//   createUser: mockCreateUseR(),
// });

describe('user tests', () => {
  // test('should responde 200', async () => {
  //   const response = await request(makeApp).post('/post/user').send({
  //     user: 'johnny',
  //     password: '123',
  //   });
  //   console.log(response);
  //   expect(response.status).toBe(200);
  // });
  test('should be 1 + 1', async () => {
    const a = 1;
    const b = 1;
    const c = a + b;
    expect(c).toBe(2);
  });
});
