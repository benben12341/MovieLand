import config from 'config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from 'fs';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import { connectDB } from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { createMessage } from './controllers/messageController.js';

import { Server } from 'socket.io';

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/messages', messageRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const dirname = path.resolve();

app.use('/uploads', express.static(path.join(dirname, '/uploads')));

app.use(express.static(path.join(dirname, 'dist')));

console.log(path.join(dirname, 'dist', 'index.html'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(dirname, 'dist', 'index.html'));
});

app.use(notFound);
app.use(errorHandler);

const port = config.get('app.port') || 5000;

let server;
if (process.env.NODE_ENV !== 'production') {
  console.log(`development:${port}`);
  server = http
    .createServer(app)
    .listen(port, () => console.log(`listening on port ${port}`));
} else {
  const options = {
    key: fs.readFileSync(path.resolve(dirname, './client-key.pem')),
    cert: fs.readFileSync(path.resolve(dirname, './client-cert.pem'))
  };
  server = https
    .createServer(options, app)
    .listen(443, () => console.log(`listening on port ${port}`));
}

const io = new Server(server);

io.on('connection', socket => {
  socket.on('new-message', message => {
    createMessage(message);
    io.emit('update-messages', message);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('clients', io.engine.clientsCount);
  });
});
