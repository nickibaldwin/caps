'use strict';

const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

const socket = io.connect(`${SERVER_URL}/caps`);

socket.on('pickup', payload => { //1- emit in-transit after 1.5 seconds and delivered 3 seconds after that

  setTimeout(() => {
    socket.emit('in-transit', payload);
  }, 1500);

  setTimeout(() => {
    socket.emit('delivered', payload);
  }, 3000);

});