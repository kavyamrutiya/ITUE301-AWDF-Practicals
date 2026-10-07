const taskEvents = require('./taskEvents');

/**
 * Task Event Listeners (Practical 10)
 * Handles background notifications asynchronously without blocking the client response.
 * Simulates artificial I/O delay (e.g. SMTP email dispatch or webhook broadcast).
 */

// 1. Task Created Listener
taskEvents.on('task-created', (task) => {
  const startedAt = new Date().toISOString();
  console.log(`[Notification] Handler STARTED at ${startedAt} for Task: "${task.title}" (Priority: ${task.priority.toUpperCase()}) | User: ${task.user || 'Guest'}`);

  // Artificial delay (800ms) to clearly prove non-blocking asynchronous execution
  setTimeout(() => {
    const completedAt = new Date().toISOString();
    console.log(`[Notification] Handler COMPLETED at ${completedAt} (Email dispatch simulated in 800ms background thread)`);
  }, 800);
});

// 2. Task Deleted Listener
taskEvents.on('task-deleted', (task) => {
  const startedAt = new Date().toISOString();
  console.log(`[Notification] Handler STARTED at ${startedAt} for DELETED Task: "${task.title}"`);

  setTimeout(() => {
    const completedAt = new Date().toISOString();
    console.log(`[Notification] Handler COMPLETED at ${completedAt} (Audit logging recorded in 500ms background thread)`);
  }, 500);
});

// 3. Error Event Listener
taskEvents.on('error', (err) => {
  console.error('[Notification ERROR Caught]:', err.message);
});

console.log('[EVENTS] Dedicated Task Event Listeners registered successfully.');
