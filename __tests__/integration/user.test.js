import request from 'supertest';
import app from '../../src/app';

describe('users', () => {
  describe('post', () => {
    it('should create a new user with correct params', async () => {
      expect.assertions(2);
      await request(app).post('/roles').send({ name: 'Admin' });

      const response = await request(app).post('/users').send({
        name: 'Admin',
        email: 'admin@email.com',
        cpf: '012.012.145-01',
        role: 'Admin',
        password: 'adminpassword',
      });

      expect(response.status).toBe(201);
      expect(response.body.data.user).toHaveProperty('name', 'Admin');
    });

    it('should not create a new user without valid params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/users').send({
        name: 123,
        email: 'email@email.com',
        cpf: '012.012.012-01',
        role: 'Admin',
        password: 'password',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new user with blank params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/users').send({
        name: 'My Name',
        email: ' ',
        cpf: '012.012.012-01',
        role: 'Role Test',
        password: 'password',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new user data if already exists a user data with the same cpf', async () => {
      expect.assertions(1);

      const response = await request(app).post('/users').send({
        name: 'My Name',
        email: 'anotheremail@email.com',
        cpf: '012.012.145-01',
        role: 'Admin',
        password: 'password',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new user without a valid cpf', async () => {
      expect.assertions(1);

      const response = await request(app).post('/users').send({
        name: 'My Name',
        email: 'anotheremail@email.com',
        cpf: 'asd.012.012-01',
        role: 'Admin',
        password: 'password',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new user without a valid cpf format', async () => {
      expect.assertions(1);

      const response = await request(app).post('/users').send({
        name: 'My Name',
        email: 'anotheremail@email.com',
        cpf: '122012.012-01',
        role: 'Admin',
        password: 'password',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new user data if already exists a user data with the same email', async () => {
      expect.assertions(1);

      const response = await request(app).post('/users').send({
        name: 'My Name',
        email: 'admin@email.com',
        cpf: '022.022.022-02',
        role: 'Admin',
        password: 'password',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new user without a valid email format', async () => {
      expect.assertions(1);

      const response = await request(app).post('/users').send({
        name: 'My Name',
        email: 'emailemail.com',
        cpf: '022.022.022-02',
        role: 'Admin',
        password: 'password',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new user without an existent role param', async () => {
      expect.assertions(1);

      const response = await request(app).post('/users').send({
        name: 'My Name',
        email: 'email@email.com',
        cpf: '022.022.022-02',
        role: 'Nonexistent',
        password: 'password',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should get all users data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
    });

    it('should get an user data through query param "name"', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?name=Admin');

      expect(response.status).toBe(200);
    });

    it('should not get an user data through query param "name" without an existing data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?name=Nonexistent');

      expect(response.status).toBe(400);
    });

    it('should not get an user data through query param "name" without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?name=123');

      expect(response.status).toBe(400);
    });

    it('should get an user data through query param "cpf"', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?cpf=012.012.145-01');

      expect(response.status).toBe(200);
    });

    it('should not get an user data through query param "cpf" without a valid format data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?cpf=012331.012-01');

      expect(response.status).toBe(400);
    });

    it('should not get an user data through query param "cpf" without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?cpf=asd.951.012-01');

      expect(response.status).toBe(400);
    });

    it('should not get an user data through query param "cpf" without an existent data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?cpf=088.951.612-01');

      expect(response.status).toBe(400);
    });

    it('should get an user data through query param "email"', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?email=admin@email.com');

      expect(response.status).toBe(200);
    });

    it('should not get an user data through query param "email" without a valid format data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?email=admin@email');

      expect(response.status).toBe(400);
    });

    it('should not get an user data through query param "email" without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?email=adminemail.com');

      expect(response.status).toBe(400);
    });

    it('should not get an user data through query param "email" without an existent data', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/users?email=nonexistent@email.com'
      );

      expect(response.status).toBe(400);
    });

    it('should get an user data through query param "role"', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?role=Admin');

      expect(response.status).toBe(200);
    });

    it('should not get an user data through query param "role" without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?role=123');

      expect(response.status).toBe(400);
    });

    it('should not get an user data through query param "role" without an existent data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users?role=Nonexistent');

      expect(response.status).toBe(400);
    });
  });

  describe('show', () => {
    it('should get an specific user data by ID', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users/1');

      expect(response.status).toBe(200);
    });

    it('should not get an specific user data by ID without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users/asd');

      expect(response.status).toBe(400);
    });

    it('should not get an specific user data by ID without an existent param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users/1000');

      expect(response.status).toBe(400);
    });
  });

  describe('update', () => {
    it('should update all user data with correct params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/users/1').send({
        name: 'New Admin',
        email: 'newemail@email.com',
        cpf: '034.012.012-01',
        role: 'Admin',
        password: 'newpassword',
      });

      expect(response.status).toBe(204);
    });

    it('should not update a user data with an invalid ID param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/users/asdas1').send({
        name: 'New Name',
        email: 'email@email.com',
        cpf: '014.012.012-01',
        role: 'Role Test',
        password: 'newpassword',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a user data with a nonexistent ID param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/users/1001').send({
        name: 'New Name',
        email: 'email@email.com',
        cpf: '014.012.012-01',
        role: 'Role Test',
        password: 'newpassword',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a user data with blank params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/users/1').send({
        name: 'New Name',
        email: ' ',
        cpf: '014.012.012-01',
        role: 'Role Test',
        password: 'newpassword',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('delete', () => {
    it('should delete a specific user by ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/users/1');

      expect(response.status).toBe(204);
    });

    it('should not delete a specific user without a valid ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/users/asd');

      expect(response.status).toBe(400);
    });

    it('should not delete a specific role without an existing ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/users/1000');

      expect(response.status).toBe(400);
    });
  });
});
