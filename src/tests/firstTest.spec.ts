/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
import User from '../models/User';

describe('User tests', () => {
  test('it should be a new superUser', () => {
    const user = new User(
      'super',
      'super@super.com',
      '123456',
      '11.114.555-5',
      '111.222.333.444-55',
      'Masculino',
      true,
    );
    // console.log(user);
    expect(user.name).toBe('super');
    expect(user.email).toBe('super@super.com');
    expect(user.password).toBe('123456');
    expect(user.rg).toBe('11.114.555-5');
    expect(user.cpf).toBe('111.222.333.444-55');
    expect(user.superUser).toBe(true);
  });
  test('it should be a new user', () => {
    const user = new User(
      'johnny',
      'johnny@johnny.com',
      '123456',
      '11.114.555-5',
      '111.222.333.444-55',
      'Masculino',
      false,
    );
    // console.log(user);
    expect(user.name).toBe('johnny');
    expect(user.email).toBe('johnny@johnny.com');
    expect(user.password).toBe('123456');
    expect(user.rg).toBe('11.114.555-5');
    expect(user.cpf).toBe('111.222.333.444-55');
    expect(user.superUser).toBe(false);
  });
});
