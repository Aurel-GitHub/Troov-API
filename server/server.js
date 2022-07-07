require('dotenv').config();
const http = require('http');

const app = require('./app');

app.set('port', process.env.DEFAULT_PORT || process.env.PORT);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
