const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Task = require('../models/Task');

/**
 * Practical 12: CI/CD Automated Test Suite
 * Evaluates core API endpoints, status codes, and payload integrity.
 * Verified to execute cleanly both in local development and GitHub Actions runner.
 */

describe('Practical 12: Automated CI/CD Pipeline Tests', () => {

  beforeAll(async () => {
    // If not connected to a live MongoDB instance, mock the Task model find query
    // so tests run deterministically without depending on external daemon availability
    if (mongoose.connection.readyState !== 1) {
      jest.spyOn(Task, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue([
          {
            _id: '64f1a2b3c4d5e6f7a8b9c0d1',
            title: 'Automated CI/CD Test Task',
            description: 'Verified by GitHub Actions pipeline',
            completed: false,
            priority: 'high',
            createdAt: new Date().toISOString()
          }
        ])
      });
    }
  });

  // Gracefully close any active MongoDB connections when test suite completes
  afterAll(async () => {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }
    } catch (err) {
      // Ignore disconnect errors during teardown
    }
  });

  // -------------------------------------------------------------
  // Test 1: Root Health Check Endpoint
  // -------------------------------------------------------------
  describe('GET / (Root Health Check)', () => {
    it('should return status 200 and practical metadata', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('architecture');
      expect(res.body.message).toContain('Practical 12');
    });
  });

  // -------------------------------------------------------------
  // Test 2: Primary Tasks Endpoint (Curriculum Specification)
  // Curriculum Step 2 requirement: GET /tasks returns 200
  // -------------------------------------------------------------
  describe('GET /tasks (Retrieve All Tasks)', () => {
    it('GET /tasks returns 200', async () => {
      const res = await request(app).get('/tasks');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('GET /api/tasks also returns 200 with JSON payload', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toMatch(/json/);
    });
  });

  // -------------------------------------------------------------
  // Test 3: Cache Performance & Statistics Endpoint (Practical 9 Heritage)
  // -------------------------------------------------------------
  describe('GET /api/debug/cache-stats (Cache System Health)', () => {
    it('should return cache statistics with status 200', async () => {
      const res = await request(app).get('/api/debug/cache-stats');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('stats');
      expect(res.body.stats).toHaveProperty('keys');
      expect(res.body.stats).toHaveProperty('cacheHits');
    });
  });

  // -------------------------------------------------------------
  // Test 4: Content-Type Validation Middleware (Practical 4 Heritage)
  // -------------------------------------------------------------
  describe('POST /api/tasks (Content-Type Middleware)', () => {
    it('should reject requests without application/json with 415 Unsupported Media Type', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Content-Type', 'text/plain')
        .send('Invalid non-json payload');

      expect(res.statusCode).toBe(415);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error', 'Unsupported Media Type');
    });
  });

  // -------------------------------------------------------------
  // Test 5: Authentication Validation (Practical 7 Heritage)
  // -------------------------------------------------------------
  describe('POST /api/auth/login (Input Validation)', () => {
    it('should return 400 when email or password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({ email: '' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // -------------------------------------------------------------
  // Test 6: 404 Route Not Found Handler
  // -------------------------------------------------------------
  describe('GET /invalid-non-existent-route', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app).get('/api/non-existent-endpoint-404');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('success', false);
    });
  });

});
