'use strict';

const events = require('../events.js');
let faker = require('faker');

events.on('delivered', thankYou);

function thankYou(payload) {
  console.log(`Thank you for delivering ${payload.orderId}`);
}

setInterval(() => {
  let fakerOrder = {
    store: faker.company.companyName(),
    orderId: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  };

  events.emit('pickup', fakerOrder);
}, 5000);

module.exports = { thankYou };
