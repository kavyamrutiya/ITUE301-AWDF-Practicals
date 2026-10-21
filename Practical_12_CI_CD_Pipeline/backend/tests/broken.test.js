const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

/**
 * DELIBERATE FAILURE DEMONSTRATION SUITE (Practical 12 Rubric 4)
 * 
 * Objective:
 * Demonstrates a deliberately broken assertion that causes the CI pipeline to FAIL.
 * 
 * Expected vs Received:
 * Expected: 999 (Impossible HTTP status code)
 * Received: 200 (Real status returned by GET /)
 * 
 * To run this test and observe the pipeline failure locally:
 *   npm run test:broken
 */

describe('Practical 12: Deliberately Broken Test (Failure Demonstration)', () => {

  afterAll(async () => {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }
    } catch (err) {
      // Ignore
    }
  });

  test('GET / returns 999 (DELIBERATE FAILURE ASSERTION)', async () => {
    const res = await request(app).get('/');

    // INTENTIONAL MISMATCH: The server legitimately returns 200 OK.
    // Changing expected to 999 triggers Jest assertion failure and exits with code 1.
    expect(res.statusCode).toBe(999);
  });

  test('GET /tasks returns 404 (DELIBERATE SECOND FAILURE)', async () => {
    const res = await request(app).get('/tasks');

    // INTENTIONAL MISMATCH: GET /tasks returns 200, but test asserts 404
    expect(res.statusCode).toBe(404);
  });

});
