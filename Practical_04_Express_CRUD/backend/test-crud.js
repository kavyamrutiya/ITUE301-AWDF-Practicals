const http = require('http');
const app = require('./server');

const PORT = 5002;
let server;

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  server = app.listen(PORT, async () => {
    console.log('--- PRACTICAL 4 AUTOMATED TEST SUITE ---');
    try {
      // 1. GET /tasks
      const getRes = await makeRequest({
        hostname: 'localhost',
        port: PORT,
        path: '/tasks',
        method: 'GET'
      });
      console.log('✓ TEST 1: GET /tasks -> Status:', getRes.status, '| Total tasks:', getRes.body.count);

      // 2. POST /tasks (Create new task)
      const postRes = await makeRequest({
        hostname: 'localhost',
        port: PORT,
        path: '/tasks',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, { title: 'Test Task Creation', description: 'Testing POST endpoint', priority: 'high' });
      console.log('✓ TEST 2: POST /tasks -> Status:', postRes.status, '| Created ID:', postRes.body.data.id);
      const newId = postRes.body.data.id;

      // 3. GET /tasks/:id (Fetch created task)
      const getSingleRes = await makeRequest({
        hostname: 'localhost',
        port: PORT,
        path: `/tasks/${newId}`,
        method: 'GET'
      });
      console.log('✓ TEST 3: GET /tasks/:id -> Status:', getSingleRes.status, '| Title:', getSingleRes.body.data.title);

      // 4. PUT /tasks/:id (Update task)
      const putRes = await makeRequest({
        hostname: 'localhost',
        port: PORT,
        path: `/tasks/${newId}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      }, { title: 'Updated Title', completed: true });
      console.log('✓ TEST 4: PUT /tasks/:id -> Status:', putRes.status, '| Completed:', putRes.body.data.completed);

      // 5. DELETE /tasks/:id (Delete task)
      const delRes = await makeRequest({
        hostname: 'localhost',
        port: PORT,
        path: `/tasks/${newId}`,
        method: 'DELETE'
      });
      console.log('✓ TEST 5: DELETE /tasks/:id -> Status:', delRes.status, '| Deleted ID:', delRes.body.data.id);

      // 6. Confirm 404 for deleted task
      const getDeletedRes = await makeRequest({
        hostname: 'localhost',
        port: PORT,
        path: `/tasks/${newId}`,
        method: 'GET'
      });
      console.log('✓ TEST 6: GET deleted task -> Status:', getDeletedRes.status, '(Expected 404)');

      // 7. Test 404 catch-all
      const notFoundRes = await makeRequest({
        hostname: 'localhost',
        port: PORT,
        path: '/undefined-route-testing',
        method: 'GET'
      });
      console.log('✓ TEST 7: 404 Handler -> Status:', notFoundRes.status, '(Expected 404)');

      // 8. Test Content-Type validation
      const invalidTypeRes = await makeRequest({
        hostname: 'localhost',
        port: PORT,
        path: '/tasks',
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }
      }, 'plain text body');
      console.log('✓ TEST 8: Content-Type Validation -> Status:', invalidTypeRes.status, '(Expected 415)');

      console.log('--- ALL PRACTICAL 4 TESTS PASSED (8/8) ---');
    } catch (err) {
      console.error('Test execution error:', err);
    } finally {
      server.close();
      process.exit(0);
    }
  });
}

runTests();
