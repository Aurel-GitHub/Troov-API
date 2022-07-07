const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/item', (req, res) => {
  const item = [{
    _id: 'sdf65sdf65',
    where: 'aeroport',
    isLost: true,
    when: '2022-06-25',
    brandName: 'toto',
    firstname: 'doe',
    lastname: 'john',
    status: 'sdfsdfsdf',
    description: 'fdsf',
    photo: 'sfsd',
    userId: 'sd6f45d4fsd4f',
  }];

  res.status(200).json(item);
});

module.exports = app;
