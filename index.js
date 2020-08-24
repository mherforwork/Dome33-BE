const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const monitor = require('./monitor');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

process.on('exit', () => monitor.end());

const httpServer = http.createServer(app);
httpServer.listen(5000, () => {
  monitor.start();
  console.log(`🚀 Server ready at http://localhost:5000`);

  monitor.listen('temperature', data => console.log(`Temperature:${data} °C`));
  monitor.listen('air-pressure', data => console.log(`Air-Pressure:${data} Pa`));
  monitor.listen('humidity', data => console.log(`Humidity:${data} %`));
});

