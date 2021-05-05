'use strict';

const io = require('socket.io-client');

let host = "http://localhost:3000/caps";

const capsConnection = io.connect(host);

capsConnection.on('pickup', pickUp);

function pickUp(payload) {
  setTimeout(() => {
    console.log(`picking up ${payload.id}`);
    capsConnection.emit('in-transit', payload);
  }, 1500);
  setTimeout(() => {
    console.log(`delievered`, payload);
  }, 3000);
  
}