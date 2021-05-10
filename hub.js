'use strict';

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(PORT); //socket.io server (permits the event handlers )

const caps = io.of('/caps'); //caps is namespace

caps.on('connection', socket => { // namespace is listening for connections. we broadcast globally here for the vendor and driver know where we are at all points in time
  //log the client if that has connected to this namespace
  console.log('connected user - namesapce:', socket.id);

  //whenever a socket makes an incoming event of 'join', we're going to have them join that specific room)
  socket.on('join', room => {
    console.log('room name', room);
    socket.join(room);
  });

//event listeners- socket.on
  socket.on('pickup', payload => { //listening for pickup event
    logger('pickup', payload); //here we are logging the timestamp and event for each pickup, vendor and driver can see it only? 23 minutes
    caps.emit('pickup', payload); //
  });
  socket.on('in-transit', payload => { //tells the server what is in-transit? ID's are helpful
    logger('in-transit', payload); 
    // caps.to(payload.store).emit('in-transit', payload); //this lets the store/vendor know that the package is in transit
    //namespace.to(store)
    //in this snamespace, we're going to talk to this room, and everyone in this room, we're telling them that it's in-transit
  });

  socket.on('delivered', payload => { //tels the server what is in-transit? ID's are helpful
    logger('delivered', payload); 
    caps.to(payload.store).emit('delivered', payload);//emits (tells) to specific clients (or vendors or whomever) that it was delivered, 
  });
  //helper function used to help supply information/functionality only in this file - log the time an action takes place
  //and log the action and data being passed

  function logger(event, payload) {
    let timestamp = new Date();
    console.log({ timestamp, event, payload });//considered a destructured object
  }

});