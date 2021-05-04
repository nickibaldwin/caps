'use strict';

// Global Event Pool (shared by all modules)
const Events = require('events'); // pull in the 1st party Events (aka EventEmitter) module, I don't need to npm install
const events = new Events(); // instantiation of our application event pool

module.exports = events;