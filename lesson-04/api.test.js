const { describe, it } = require('mocha');
const request = require('supertest');
const app = require('./api');
const assert = require('assert');

describe('API suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200);

      assert.deepStrictEqual(response.text, 'contact us page');
    });
  });

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app)
        .get('/hi')
        .expect(200);

      assert.deepStrictEqual(response.text, 'Hello world');
    });
  });

  describe('/login', () => {
    it('should login sucessfully on the login route and return HTTP status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'SamuelLAs', password: '123' })
        .expect(200);

      assert.deepStrictEqual(response.text, 'Login has succeeded');
    });
  });

  describe('/login', () => {
    it('should unauthorize a request when requestign it using wrong credentials and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'SamuelLAs', password: '1541848' })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, 'Login failed');
    });
  });
});