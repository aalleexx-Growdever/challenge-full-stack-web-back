import request from 'supertest';
import app from '../../src/app';

describe('login', () => {
  describe('login', () => {
    it('should be able to login with the valid data params', async () => {
      expect.assertions(3);

      const response = await request(app).get('/login').send({
        email: 'manager@email.com',
        password: 'managerpassword',
      });

      expect(response.status).toBe(200);
      expect(response.body.data.user).toHaveProperty(
        'email',
        'manager@email.com'
      );
      expect(response.body.data.user).toHaveProperty('name', 'Manager');
    });

    it('should not be able to login without the valid data params', async () => {
      expect.assertions(1);

      const response = await request(app).get('/login').send({
        email: 'another@email.com',
        password: 'managerpassword',
      });

      expect(response.status).toBe(401);
    });
  });
});
