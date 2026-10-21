const http = require('http');

const PORT = process.env.PORT || 5001;
const HOST = 'localhost';

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const start = process.hrtime.bigint();
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const end = process.hrtime.bigint();
        const durationMs = Number(end - start) / 1e6;
        try {
          resolve({ status: res.statusCode, durationMs, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, durationMs, body: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(JSON.stringify(postData));
    req.end();
  });
}

async function runBenchmark() {
  console.log('====================================================');
  console.log('🚀 PRACTICAL 9: CACHE PERFORMANCE BENCHMARK SUITE');
  console.log('====================================================\n');

  try {
    // 1. Obtain JWT Token via register/login
    console.log('Authenticating benchmark agent...');
    const authRes = await request({
      hostname: HOST,
      port: PORT,
      path: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Benchmark Tester',
      email: `bench_${Date.now()}@charusat.edu`,
      password: 'password123'
    });

    const token = authRes.body?.token;
    if (!token) {
      console.error('Failed to obtain auth token. Is backend server running on port', PORT, '?');
      return;
    }
    console.log('✓ Token acquired successfully.\n');

    // Headers with Bearer token
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // 2. Clear cache first
    await request({
      hostname: HOST,
      port: PORT,
      path: '/api/debug/cache/clear',
      method: 'POST'
    });

    // Disable cache for uncached measurement
    await request({
      hostname: HOST,
      port: PORT,
      path: '/api/debug/cache/toggle',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { enabled: false });

    console.log('--- PHASE 1: MEASURING UNCACHED (DIRECT DATABASE) ---');
    const uncachedTimes = [];
    for (let i = 1; i <= 3; i++) {
      const res = await request({
        hostname: HOST,
        port: PORT,
        path: '/tasks',
        method: 'GET',
        headers
      });
      uncachedTimes.push(res.durationMs);
      console.log(`  Sample ${i} (Uncached): ${res.durationMs.toFixed(2)} ms | Status: ${res.status}`);
    }

    // Enable cache
    await request({
      hostname: HOST,
      port: PORT,
      path: '/api/debug/cache/toggle',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { enabled: true });

    // Initial priming request (Cache Miss)
    console.log('\nPriming cache with initial request...');
    await request({ hostname: HOST, port: PORT, path: '/tasks', method: 'GET', headers });

    console.log('--- PHASE 2: MEASURING CACHED (IN-MEMORY node-cache) ---');
    const cachedTimes = [];
    for (let i = 1; i <= 3; i++) {
      const res = await request({
        hostname: HOST,
        port: PORT,
        path: '/tasks',
        method: 'GET',
        headers
      });
      cachedTimes.push(res.durationMs);
      console.log(`  Sample ${i} (Cached):   ${res.durationMs.toFixed(2)} ms | Status: ${res.status} | Source: ${res.body.source}`);
    }

    const avgUncached = uncachedTimes.reduce((a, b) => a + b, 0) / uncachedTimes.length;
    const avgCached = cachedTimes.reduce((a, b) => a + b, 0) / cachedTimes.length;
    const latencyReduction = ((avgUncached - avgCached) / avgUncached) * 100;
    const speedupFactor = (avgUncached / avgCached).toFixed(1);

    console.log('\n====================================================');
    console.log('📊 BENCHMARK SUMMARY RESULTS:');
    console.log('====================================================');
    console.log(`Average Uncached Latency: ${avgUncached.toFixed(2)} ms`);
    console.log(`Average Cached Latency:   ${avgCached.toFixed(2)} ms`);
    console.log(`Latency Reduction:        ${latencyReduction.toFixed(2)}%`);
    console.log(`Performance Speedup:      ${speedupFactor}x faster`);
    console.log('====================================================\n');

    // 3. Telemetry stats
    const statsRes = await request({
      hostname: HOST,
      port: PORT,
      path: '/api/debug/cache',
      method: 'GET'
    });
    console.log('Cache Telemetry Stats:', statsRes.body?.data);

  } catch (err) {
    console.error('Benchmark error:', err.message);
  }
}

runBenchmark();
