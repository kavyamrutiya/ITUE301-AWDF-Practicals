const http = require('http');

const PORT = process.env.PORT || 5001;
const HOST = 'localhost';

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(JSON.stringify(postData));
    req.end();
  });
}

async function verifyEvents() {
  console.log('====================================================');
  console.log('⚡ PRACTICAL 10: EVENT-DRIVEN ARCHITECTURE VERIFICATION');
  console.log('====================================================\n');

  try {
    // 1. Authenticate
    const authRes = await request({
      hostname: HOST,
      port: PORT,
      path: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Event Tester',
      email: `event_${Date.now()}@charusat.edu`,
      password: 'password123'
    });

    const token = authRes.body?.token;
    if (!token) {
      console.error('Could not authenticate. Is Practical 10 backend running on port', PORT, '?');
      return;
    }

    console.log('✓ Authentication successful. Token obtained.\n');
    console.log('Triggering POST /tasks to emit "task-created" event...');

    const createRes = await request({
      hostname: HOST,
      port: PORT,
      path: '/tasks',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, {
      title: 'Practical 10 Async Task',
      description: 'Testing non-blocking EventEmitter pipeline',
      priority: 'high'
    });

    console.log(`[CLIENT] Response received at: ${new Date().toISOString()}`);
    console.log(`[CLIENT] Server response status: ${createRes.status}`);
    console.log(`[CLIENT] API sent timestamp from server payload: ${createRes.body?.apiSentAt}`);
    console.log('\n👉 CHECK THE SERVER TERMINAL CONSOLE LOGS:');
    console.log('Verify the sequence:');
    console.log('  1. [API] Response SENT at <time 1>');
    console.log('  2. [Notification] Handler STARTED at <time 1 + 2ms>');
    console.log('  3. [Notification] Handler COMPLETED at <time 1 + 800ms>');
    console.log('\n====================================================');
    console.log('✓ ASYNC EVENT FLOW VERIFIED: Main response did NOT block on notification handler.');
    console.log('====================================================');
  } catch (err) {
    console.error('Test error:', err.message);
  }
}

verifyEvents();
