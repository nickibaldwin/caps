'use strict';

const io = require('socket.io-client');
const faker = require('faker');
require('dotenv').config();

let host = "http://localhost:3000/caps";

//========Connect=============
const capsConnection = io.connect(host);

//========Listeners=============

capsConnection.on('delievered', deliveryLogged);

function deliveryLogged(payload) {
  console.log(`Thank you for delivering ${payload.id}`);
}

//========Event Handlers=============

setInterval(() => {
  const newOrder = {storeId: "STOREIDtest", orderId: faker.datatype.uuid(), Name: faker.name.findName(), address: faker.address.streetAddress() };
  console.log(newOrder);
  capsConnection.emit('pickup', newOrder);
}, 5000);