import User from '../models/User';

describe('User Model', () => {
  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: 'user'
    };

    const user = new User(userData);
    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
    expect(user.role).toBe(userData.role);
  });
});