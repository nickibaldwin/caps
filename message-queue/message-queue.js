'use strict';

const io = require('socket.io-client');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

const socket = io.connect(`${SERVER_URL}/caps`);

const queue = {}; //this object will hold the payloads

socket.on('add-message', payload => { //
  //TODO 
  queue[payload.orderID] = payload; // [key] = value
  console.log('item # - delievered', payload.orderID);
});
socket.on('delete-message', payload => { //
  //TODO delete function - loop over the queue and compare ID's. Delete the ID key on the object (look up JS keyword delete)
  queue[payload.orderID] = payload; // [key] = value
  console.log('item # - delievered', payload.orderID);
});

