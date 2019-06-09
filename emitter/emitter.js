/**
 * 发布与订阅
 */
const EventEmitter = require('events');
const emitter = new EventEmitter;

emitter.on('event1', (message) => {
    console.log(message);
});

emitter.emit('event1', 'message had been sent');