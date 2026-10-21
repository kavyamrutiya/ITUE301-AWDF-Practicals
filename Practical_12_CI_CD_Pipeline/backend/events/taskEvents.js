const EventEmitter = require('events');

/**
 * TaskEvents Emitter (Practical 10)
 * Native Node.js EventEmitter instance decoupled from HTTP request-response cycle.
 */
class TaskEventEmitter extends EventEmitter {}

const taskEvents = new TaskEventEmitter();
module.exports = taskEvents;
