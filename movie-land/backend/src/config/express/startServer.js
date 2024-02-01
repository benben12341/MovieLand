import config from 'config';
import path from 'path';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { Server } from 'socket.io';

import { createMessage } from '../../controllers/messageController.js';

export default (app) => {
  const port = config.get('app.port') || 5000;
  const dirname = path.resolve();

  let server;

  if (process.env.NODE_ENV !== 'production') {
    console.log(`development:${port}`);
    server = http
      .createServer(app)
      .listen(port, () => console.log(`listening on port ${port}`));
  } else {
    const options = {
      key: fs.readFileSync(path.resolve(dirname, './client-key.pem')),
      cert: fs.readFileSync(path.resolve(dirname, './client-cert.pem')),
    };
    server = https
      .createServer(options, app)
      .listen(443, () => console.log(`listening on port ${port}`));
  }

  const io = new Server(server);

  io.on('connection', (socket) => {
    socket.on('new-message', (message) => {
      createMessage(message);
      io.emit('update-messages', message);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('clients', io.engine.clientsCount);
    });
  });
};
