import request from 'supertest';
import app from '../../src/app';
import Student from '../../src/app/models/Student';

describe('students', () => {
  jest.setTimeout(60000);
  describe('post', () => {
    it('should create a new student with correct params', async () => {
      expect.assertions(2);

      const response = await request(app).post('/students').send({
        name: 'Student',
        email: 'student@email.com',
        cpf: '012.012.145-01',
      });

      expect(response.status).toBe(201);
      expect(response.body.data.student).toHaveProperty('name', 'Student');
    });

    it('should not create a new student without valid params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/students').send({
        name: 123,
        email: 'email@email.com',
        cpf: '012.012.012-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new student with blank params', async () => {
      expect.assertions(1);

      const response = await request(app).post('/students').send({
        name: 'My Name',
        email: ' ',
        cpf: '012.012.012-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new student data if already exists a student data with the same cpf', async () => {
      expect.assertions(1);

      const response = await request(app).post('/students').send({
        name: 'My Name',
        email: 'anotheremail@email.com',
        cpf: '012.012.145-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new student without a valid cpf', async () => {
      expect.assertions(1);

      const response = await request(app).post('/students').send({
        name: 'My Name',
        email: 'anotheremail@email.com',
        cpf: 'asd.012.012-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new student without a valid cpf format', async () => {
      expect.assertions(1);

      const response = await request(app).post('/students').send({
        name: 'My Name',
        email: 'anotheremail@email.com',
        cpf: '122012.012-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new student data if already exists a student data with the same email', async () => {
      expect.assertions(1);

      const response = await request(app).post('/students').send({
        name: 'My Name',
        email: 'student@email.com',
        cpf: '022.022.022-02',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new student without a valid email format', async () => {
      expect.assertions(1);

      const response = await request(app).post('/students').send({
        name: 'My Name',
        email: 'emailemail.com',
        cpf: '022.022.022-02',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should get all students data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students');

      expect(response.status).toBe(200);
    });

    it('should get an student data through query param "name"', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students?name=Student');

      expect(response.status).toBe(200);
    });

    it('should not get an student data through query param "name" without an existing data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students?name=Nonexistent');

      expect(response.status).toBe(400);
    });

    it('should not get an student data through query param "name" without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students?name=123');

      expect(response.status).toBe(400);
    });

    it('should get an student data through query param "cpf"', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students?cpf=012.012.145-01');

      expect(response.status).toBe(200);
    });

    it('should not get an student data through query param "cpf" without a valid format data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students?cpf=012331.012-01');

      expect(response.status).toBe(400);
    });

    it('should not get an student data through query param "cpf" without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students?cpf=asd.951.012-01');

      expect(response.status).toBe(400);
    });

    it('should not get an student data through query param "cpf" without an existent data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students?cpf=088.951.612-01');

      expect(response.status).toBe(400);
    });

    it('should get an student data through query param "email"', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/students?email=student@email.com'
      );

      expect(response.status).toBe(200);
    });

    it('should not get an student data through query param "email" without a valid format data', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students?email=admin@email');

      expect(response.status).toBe(400);
    });

    it('should not get an student data through query param "email" without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students?email=adminemail.com');

      expect(response.status).toBe(400);
    });

    it('should not get an student data through query param "email" without an existent data', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/students?email=nonexistent@email.com'
      );

      expect(response.status).toBe(400);
    });
  });

  describe('show', () => {
    it('should get an specific student data by "AR"(academic record)', async () => {
      expect.assertions(1);

      const student = await Student.findOne();

      const ar = student.academic_record;

      const response = await request(app).get(`/students/${ar}`);

      expect(response.status).toBe(200);
    });

    it('should not get an specific student data by AR without a valid param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students/asd123');

      expect(response.status).toBe(400);
    });

    it('should not get an specific student data by AR without an existent param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/students/110000');

      expect(response.status).toBe(400);
    });
  });

  describe('update', () => {
    it('should update a student data with correct params by AR param', async () => {
      expect.assertions(1);

      const student = await Student.findOne();

      const ar = student.academic_record;

      const response = await request(app).put(`/students/${ar}`).send({
        name: 'Updated Student',
        email: 'updatedstudent@email.com',
        cpf: '012.342.745-01',
      });

      expect(response.status).toBe(204);
    });

    it('should update a student data with correct params by AR param but without CPF data', async () => {
      expect.assertions(1);

      const student = await Student.findOne();

      const ar = student.academic_record;

      const response = await request(app).put(`/students/${ar}`).send({
        name: 'Updated Student',
        email: 'asdsupdatedstudent@email.com',
      });

      expect(response.status).toBe(204);
    });

    it('should not update a student data with an invalid AR param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/students/asds12').send({
        name: 'New Student',
        email: 'newstudent@email.com',
        cpf: '012.342.745-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a student data with a nonexistent AR param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/students/110000').send({
        name: 'New Student',
        email: 'newstudent@email.com',
        cpf: '012.342.745-01',
      });

      expect(response.status).toBe(400);
    });

    it('should not update a student data with blank params', async () => {
      expect.assertions(1);

      const student = await request(app).post('/students').send({
        name: 'One More Student',
        email: 'onemorestudent@email.com',
        cpf: '092.342.745-01',
      });

      const { academic_record } = student;

      const response = await request(app)
        .put(`/students/${academic_record}`)
        .send({
          name: 'New Name',
          email: ' ',
          cpf: '014.012.012-01',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('delete', () => {
    it('should delete a specific student by AR param', async () => {
      expect.assertions(1);

      const student = await Student.findOne();

      const ar = student.academic_record;

      const response = await request(app).delete(`/students/${ar}`);

      expect(response.status).toBe(204);
    });

    it('should not delete a specific student without a valid AR param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/students/asdasd');

      expect(response.status).toBe(400);
    });

    it('should not delete a specific role without an existing AR param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/students/110000');

      expect(response.status).toBe(400);
    });
  });
});
