const express = require('express');

const app = express();

app.use((req, res) => {
  res.json({
    message: 'la requete a bien ete recue',
  });
});

module.exports = app;
