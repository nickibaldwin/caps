'use strict';

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(PORT);

const caps = io.of('/caps');

caps.on('connection', socket => {

  console.log('Your new connection id: ', socket.id);
  caps.on('pickup', payload => {
    console.log('pickup', payload);

    caps.broadcast.emit('pickup', payload)
  });

  caps.on('in-transit', payload => {
    console.log('transit', payload);

    caps.broadcast.emit('in-transit', payload)
  });
  caps.on('delivered', payload => {
    console.log('delievered', payload);

    caps.broadcast.emit('delievered', payload)
  });
  
});
