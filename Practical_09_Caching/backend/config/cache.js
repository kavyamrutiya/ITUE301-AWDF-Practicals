const NodeCache = require('node-cache');

/**
 * In-Memory Cache Configuration (Practical 9)
 * - stdTTL: 60 seconds (Cache time-to-live)
 * - checkperiod: 120 seconds (Automatic expired key eviction)
 */
const cache = new NodeCache({
  stdTTL: 60,
  checkperiod: 120,
  useClones: true // Ensures cached data cannot be mutated in-place
});

// Cache telemetry counters
let cacheHits = 0;
let cacheMisses = 0;
let runtimeCacheEnabled = process.env.CACHE_ENABLED !== 'false';

const isCacheEnabled = () => runtimeCacheEnabled;

const setCacheEnabled = (enabled) => {
  runtimeCacheEnabled = Boolean(enabled);
  return runtimeCacheEnabled;
};

const incrementHits = () => {
  cacheHits++;
  console.log(`[CACHE] HIT (Total Hits: ${cacheHits})`);
};

const incrementMisses = () => {
  cacheMisses++;
  console.log(`[CACHE] MISS (Total Misses: ${cacheMisses})`);
};

const logSet = (key) => console.log(`[CACHE] SET: Key '${key}' stored (TTL: 60s)`);
const logInvalidate = (key) => console.log(`[CACHE] INVALIDATE: Key '${key}' deleted`);

const getStats = () => {
  const total = cacheHits + cacheMisses;
  const hitRate = total > 0 ? `${((cacheHits / total) * 100).toFixed(2)}%` : '0.00%';
  return {
    cacheHits,
    cacheMisses,
    totalRequests: total,
    hitRate,
    cacheEnabled: isCacheEnabled(),
    keys: cache.keys(),
    keyCount: cache.keys().length
  };
};

const resetStats = () => {
  cacheHits = 0;
  cacheMisses = 0;
  return getStats();
};

const clearData = () => {
  cache.flushAll();
  return getStats();
};

module.exports = {
  cache,
  isCacheEnabled,
  setCacheEnabled,
  incrementHits,
  incrementMisses,
  logSet,
  logInvalidate,
  getStats,
  resetStats,
  clearData
};
