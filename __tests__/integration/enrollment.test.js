import request from 'supertest';
import app from '../../src/app';

describe('enrollments', () => {
  describe('populate', () => {
    it('should create a new course with correct params', async () => {
      expect.assertions(3);

      const response1 = await request(app).post('/students').send({
        name: 'Student',
        email: 'student@email.com',
        cpf: '012.012.145-01',
      });

      const response2 = await request(app).post('/courses').send({
        course: 'Test Course',
      });

      const response3 = await request(app).post('/courses').send({
        course: 'Test Course 2',
      });

      expect(response1.status).toBe(201);
      expect(response2.status).toBe(201);
      expect(response3.status).toBe(201);
    });
  });

  describe('post', () => {
    it('should create a new enrollment with correct params', async () => {
      expect.assertions(2);

      const response = await request(app).post('/enrollments').send({
        course: 'Test Course',
        student_cpf: '012.012.145-01',
      });

      expect(response.status).toBe(201);
      expect(response.body.data.enrollment).toHaveProperty(
        'course',
        'Test Course'
      );
    });

    it('should not create a new enrollment without correct params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/enrollments').send({
        course: 123,
        student_cpf: '012.012.145-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new enrollment with blank params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/enrollments').send({
        course: ' ',
        student_cpf: '012.012.145-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new enrollment data if already exists a enrollment data with the same data params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/enrollments').send({
        course: 'Test Course',
        student_cpf: '012.012.145-01',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should get all enrollments data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/enrollments');

      expect(response.status).toBe(200);
    });

    it('should get a enrollment data through query param "course"', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/enrollments?course=Test Course'
      );

      expect(response.status).toBe(200);
    });

    it('should not get a enrollment data through query param "course" without an existing data', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/enrollments?course=Nonexistent'
      );

      expect(response.status).toBe(400);
    });

    it('should get a enrollment data through query param "student_cpf"', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/enrollments?student_cpf=012.012.145-01'
      );

      expect(response.status).toBe(200);
    });

    it('should not get a enrollment data through query param "student_cpf" without an existing data', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/enrollments?student_cpf=055.012.145-01'
      );

      expect(response.status).toBe(400);
    });
  });

  describe('show', () => {
    it('should get an specific enrollment data by ID', async () => {
      expect.assertions(1);

      const response = await request(app).get('/enrollments/1');

      expect(response.status).toBe(200);
    });

    it('should not get an specific enrollment data by ID without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/enrollments/a');

      expect(response.status).toBe(400);
    });

    it('should not get an specific enrollment data by ID without an existent param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/enrollments/1000');

      expect(response.status).toBe(400);
    });
  });

  describe('update', () => {
    it('should update a enrollment with correct params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/enrollments/1').send({
        course: 'Test Course 2',
        student_cpf: '012.012.145-01',
      });

      expect(response.status).toBe(204);
    });

    it('should not update a enrollment without correct params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/enrollments/1').send({
        course: 'Test Course',
        student_cpf: '0as.012.145-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a enrollment with blank params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/enrollments/1').send({
        course: ' ',
        student_cpf: '012.012.145-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a enrollment with invalid ID param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/enrollments/asdas').send({
        course: 'Test Course',
        student_cpf: '012.012.145-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a enrollment with nonexistent ID param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/enrollments/1000').send({
        course: 'New Name',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('delete', () => {
    it('should delete a specific enrollment by ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/enrollments/1');

      expect(response.status).toBe(204);
    });

    it('should not delete a specific enrollment without a valid ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/enrollments/asd');

      expect(response.status).toBe(400);
    });

    it('should not delete a specific enrollment without an existing ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/enrollments/1000');

      expect(response.status).toBe(400);
    });
  });
});
