import request from 'supertest';
import app from '../app';
import * as statusCodes from '../constants/statusCodes';

describe('Welcome route', () => {
  test('Testing the welcome endpoint', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(statusCodes.OK);
  });
});
