import request from 'supertest';
import app from '../../src/app';

describe('roles', () => {
  describe('post', () => {
    it('should create a new role with correct params', async () => {
      expect.assertions(2);

      const response = await request(app).post('/roles').send({
        name: 'Test',
      });

      expect(response.status).toBe(201);
      expect(response.body.data.role).toHaveProperty('name', 'Test');
    });
  });

  // describe('index', () => {});

  // describe('show', () => {});

  // describe('update', () => {});

  // describe('delete', () => {});
});
