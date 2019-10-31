import path from 'path';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import socketIO from 'socket.io';

import { 
  MAX_SELECTED_COUNT, 
  REFRESH_RATE, 
  PORT
} from './constants';

import store from './store';

const app = express();
const server = http.Server(app)
const io = socketIO(server);

app.use(morgan());

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../public')))
} else {
  const compiler = require('webpack')(require('../../webpack.config.dev.js'));

  app.use(require('webpack-dev-middleware')(compiler));
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, 
    path: '/__webpack_hmr', 
    heartbeat: 10 * 1000
  }));
}

io.on('connection', socket => {
  const { getState, dispatch } = store;
  const customerId = socket.id;

  dispatch.customers.addCustomer({ customerId, socket });

  socket.emit('update-customer-id', { customerId });

  socket.on('select-seat', (seatId) => {
    dispatch.seats.select({ seatId, customerId });
  });
});

setInterval(() => {
  const { customers, seats } = store.getState();
  
  customers.forEach(({ socket, selectedCount }) => socket.emit('update', { 
    seats,
    onlineCount: io.engine.clientsCount,
    remainingCount: MAX_SELECTED_COUNT - selectedCount
  }));
}, REFRESH_RATE);

server.listen(PORT, () =>
  console.log('Example app listening on port ' + PORT + '!'),
);