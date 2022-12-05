import request from 'supertest';

import mongoose from 'mongoose';
import User from '../models/userModel';

import app from '../app';

// const sandbox = {
//   token: '',
//   itemListId: '',
//   defaults: {
//     itemList: {
//       name: 'test-list',
//     },
//   },
// };

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /users/login', () => {
  it('should return 200 and a token', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: process.env.TEST_USER,
        password: process.env.TEST_PASSWORD,
      })
      .expect(200);

    expect(res.status).toBe(200);
    expect(res.get('Set-Cookie')).toBeDefined();
  });

  it('should not login if no username', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        password: process.env.TEST_PASSWORD,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'username',
      message: 'Invalid username.',
    });
  });

  it('should not login if no password', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: process.env.TEST_USER,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'password',
      message: 'Invalid password.',
    });
  });

  it('should not login if invalid username', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: 'invalid',
        password: process.env.TEST_PASSWORD,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'username',
      message: 'Username does not exist.',
    });
  });

  it('should not login if wrong password', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        username: process.env.TEST_USER,
        password: 'wrong',
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'password',
      message: 'Incorrect password.',
    });
  });
});

describe('POST /users/register', () => {
  it('should return 200 and a token', async () => {
    const myUser = {
      username: 'test-user',
      password: 'test-password',
    };

    await request(app)
      .post('/users/register')
      .send(myUser)
      .expect(200);

    const res = await request(app)
      .post('/users/login')
      .send(myUser)
      .expect(200);

    expect(res.get('Set-Cookie')).toBeDefined();

    await User.deleteOne({ username: myUser.username });
  });

  it('should not register if no username', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        password: process.env.TEST_PASSWORD,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'username',
      message: 'Invalid username.',
    });
  });

  it('should not register if no password', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: process.env.TEST_USER,
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'password',
      message: 'Invalid password.',
    });
  });

  it('should not register if username already exists', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: process.env.TEST_USER,
        password: 'test',
      })
      .expect(400);

    expect(res.body.error).toEqual({
      type: 'username',
      message: 'Username already exists.',
    });
  });
});

describe('POST /users/logout', () => {
  it('should return 200', async () => {
    const res0 = await request(app)
      .post('/users/login')
      .send({
        username: process.env.TEST_USER,
        password: process.env.TEST_PASSWORD,
      });

    const [token] = res0.get('Set-Cookie')[0].split('=')[1].split(';');

    await request(app)
      .post('/users/logout')
      .set('Cookie', `connect.sid=${token}`)
      .expect(200);

    const res1 = await request(app)
      .get('/users/auth')
      .set('Cookie', `connect.sid=${token}`)
      .expect(200);

    expect(res1.body.success).toBe(false);
    expect(res1.body.error).toEqual({
      type: 'auth',
      message: 'Not authenticated.',
    });
  });
});
