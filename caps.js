'use strict';

const events = require('./events.js');

require('./vendors/vendor.js');
require('./drivers/driver.js');

// payload basically means "container object" to hold our data
events.on('pickup', payload => {
  const event = { event: 'pickup', time: new Date(), payload: payload};
  console.log('EVENT', event);
});
events.on('in-transit', payload => {
  const event = { event: 'in-transit', time: new Date(), payload: payload};
  console.log('EVENT', event);
});
events.on('delivered', payload => {
  const event = { event: 'delivered', time: new Date(), payload: payload};
  console.log('EVENT', event);
});