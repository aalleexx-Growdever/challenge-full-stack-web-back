import request from 'supertest';
import app from '../../src/app';

describe('courses', () => {
  describe('post', () => {
    it('should create a new course with correct params', async () => {
      expect.assertions(2);

      const response = await request(app).post('/courses').send({
        course: 'Test',
      });

      expect(response.status).toBe(201);
      expect(response.body.data.course).toHaveProperty('course', 'Test');
    });

    it('should not create a new course without correct params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/courses').send({
        course: 123,
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new course with blank params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/courses').send({
        course: ' ',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new course data if already exists a course data with the same name', async () => {
      expect.assertions(1);

      const response = await request(app).post('/courses').send({
        course: 'Test',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should get all courses data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/courses');

      expect(response.status).toBe(200);
    });

    it('should get a course data through query param "course"', async () => {
      expect.assertions(1);

      const response = await request(app).get('/courses?course=Test');

      expect(response.status).toBe(200);
    });

    it('should not get a course data through query param "course" without an existing data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/courses?course=Nonexistent');

      expect(response.status).toBe(400);
    });

    it('should not get a course data through query param "course" without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/courses?course=123');

      expect(response.status).toBe(400);
    });
  });

  describe('show', () => {
    it('should get an specific course data by ID', async () => {
      expect.assertions(1);

      const response = await request(app).get('/courses/1');

      expect(response.status).toBe(200);
    });

    it('should not get an specific course data by ID without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/courses/a');

      expect(response.status).toBe(400);
    });

    it('should not get an specific course data by ID without an existent param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/courses/1000');

      expect(response.status).toBe(400);
    });
  });

  describe('update', () => {
    it('should update a course with correct params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/courses/1').send({
        course: 'New Test',
      });

      expect(response.status).toBe(204);
    });

    it('should not update a course without correct params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/courses/1').send({
        course: 123,
      });

      expect(response.status).toBe(400);
    });

    it('should not update a course with blank params', async () => {
      expect.assertions(1);

      const response = await request(app).put('/courses/1').send({
        course: ' ',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a course with invalid ID param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/courses/asdas').send({
        course: 'New Name',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a course with nonexistent ID param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/courses/1000').send({
        course: 'New Name',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('delete', () => {
    it('should delete a specific course by ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/courses/1');

      expect(response.status).toBe(204);
    });

    it('should not delete a specific course without a valid ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/courses/asd');

      expect(response.status).toBe(400);
    });

    it('should not delete a specific course without an existing ID param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/courses/1000');

      expect(response.status).toBe(400);
    });
  });
});
