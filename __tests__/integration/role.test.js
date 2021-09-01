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

    it('should not create a new role without correct params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/roles').send({
        name: 123,
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new role with blank params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/roles').send({
        name: ' ',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new role data if already exists a role data with the same name', async () => {
      expect.assertions(1);

      const response = await request(app).post('/roles').send({
        name: 'Test',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should get all role data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/roles');

      expect(response.status).toBe(200);
    });

    it('should get a role data through query param "name"', async () => {
      expect.assertions(1);

      const response = await request(app).get('/roles?name=Test');

      expect(response.status).toBe(200);
    });

    it('should not get a role data through query param "name" without an existing data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/roles?name=Nonexistent');

      expect(response.status).toBe(400);
    });

    it('should not get a role data through query param "name" without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/roles?name=123');

      expect(response.status).toBe(400);
    });
  });

  describe('show', () => {
    it('should get an specific role data by ID', async () => {
      expect.assertions(1);

      const response = await request(app).get('/roles/1');

      expect(response.status).toBe(200);
    });

    it('should not get an specific role data by ID without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/roles/a');

      expect(response.status).toBe(400);
    });

    it('should not get an specific role data by ID without an existent param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/roles/1000');

      expect(response.status).toBe(400);
    });
  });

  describe('update', () => {
    it('should update a role with correct params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/roles/1').send({
        name: 'New Test',
      });

      expect(response.status).toBe(204);
    });

    it('should not update a role without correct params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/roles/1').send({
        name: 123,
      });

      expect(response.status).toBe(400);
    });

    it('should not update a role with blank params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/roles/1').send({
        name: ' ',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a role with invalid ID param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/roles/asdas').send({
        name: 'New Name',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a role with nonexistent ID param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/roles/1000').send({
        name: 'New Name',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('delete', () => {
    it('should delete a specific role by ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/roles/1');

      expect(response.status).toBe(204);
    });

    it('should not delete a specific role without a valid ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/roles/asd');

      expect(response.status).toBe(400);
    });

    it('should not delete a specific role without an existing ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/roles/1000');

      expect(response.status).toBe(400);
    });
  });
});
