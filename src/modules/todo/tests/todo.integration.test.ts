import app from '../../../app';
import request from 'supertest';
import dotenv from 'dotenv';
import path from 'path';
// import fs from 'fs';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

if (process.env.NODE_ENV !== 'test') {
  console.log('NODE ENVIRONMENT:', process.env.NODE_ENV);
  throw new Error('Tests are not running in test environment!');
}

const testKeysArr: string[] = [];

describe('Todo Routes', () => {
  it('should get all todos: GET /todos', async () => {
    const response = await request(app).get('/v1/todos');
    expect(response.status).toBe(200);
  });

  it('should get all todos: GET /todos/cursor', async () => {
    const response = await request(app).get('/v1/todos/cursor');
    expect(response.status).toBe(200);
  });

  it('should create a new todo: POST /todos', async () => {
    const response = await request(app).post('/v1/todos').send({
      task: 'test-task',
      isDone: true,
    });
    testKeysArr.push(response.body.data.id);
    expect(response.status).toBe(201);
  });

  it('should get one todo: GET /todos/todo/:id', async () => {
    const response = await request(app).get(`/v1/todos/todo/${testKeysArr[0]}`);
    expect(response.status).toBe(200);
  });

  it('should update one todo: PUT /todos/:id', async () => {
    const response = await request(app).put(`/v1/todos/${testKeysArr[0]}`).send({
      task: 'updated-test-task',
      isDone: true,
    });
    expect(response.status).toBe(200);
  });

  it('should delete one todo: DELETE /todos/:id', async () => {
    const response = await request(app).delete(`/v1/todos/${testKeysArr[0]}`);
    expect(response.status).toBe(200);
  });
});

describe('Photo Upload Route', () => {
  it('should return 400 if no file provided: POST /v1/photo', async () => {
    const response = await request(app).post('/v1/photo');

    expect(response.status).toBe(400);
  });

//   // DISK STORAGE
//   it('should upload a photo successfully: POST /v1/photo', async () => {
//     const response = await request(app)
//       .post('/v1/photo')
//       .attach('avatar', path.join(__dirname, 'fixtures/test-image.png'));

//     expect(response.status).toBe(201);
//   });

  // // MEMORY STORAGE
  // it('should upload a photo successfully: POST /v1/photo', async () => {
  //   const buffer = fs.readFileSync(path.join(__dirname, 'fixtures/test-image.jpg'));

  //   const response = await request(app).post('/v1/photo').attach('avatar', buffer, 'test-image.png');

  //   expect(response.status).toBe(201);
  //   expect(response.body).toHaveProperty('url');
  // });
});
