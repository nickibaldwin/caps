'use strict';

const express = require('express');
const faker = require('faker');
const io = require('socket.io-client');
const cors = require('cors');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

//connect our socket.io client to a socket.io server that lives on PORT 3000, then connect us to the namespace 'caps'
const socket = io.connect(`${SERVER_URL}/caps`);

const app = express();
const PORT = process.env.PORT || 3001; //3000 is already being used by my hub/server

//1:35:30
app.use(cors()); //open our API to all
app.use(express.json());//allow our PORT/PUT requests with a req.body
app.use(express.urlencoded({ extended: true}));// ensure req.body can be sent from a form

//THIS IS OUR API ROUTE - Kicks off communication with our SERVER HUB
//REST route so I can use swagger to hit it
app.post('/pickup', (req, res) => {
  let pckg = req.body || {
    storeId: '1-800-flowerz',
    orderId: faker.datatype.uuid(), 
    customer: faker.name.findName(), 
    address: faker.address.streetAddress(),
  };
  //1:39
  socket.emit('pickup', pckg);
  res.status(200).send('your pckg was scheduled for delievery');

});


app.listen(PORT, () => {
  console.log(`API Server Up! ${PORT}`);
});

