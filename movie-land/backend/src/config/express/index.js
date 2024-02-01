import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { notFound, errorHandler } from '../../middlewares/errorMiddleware.js';
import movieRoutes from '../../routes/movieRoutes.js';
import userRoutes from '../../routes/userRoutes.js';
import uploadRoutes from '../../routes/uploadRoutes.js';
import messageRoutes from '../../routes/messageRoutes.js';
import startServer from './startServer.js';

const initApp = () => {
  const app = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  app.use('/api/movies', movieRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/messages', messageRoutes);

  const dirname = path.resolve();

  app.use('/uploads', express.static(path.join(dirname, '/uploads')));

  app.use(express.static(path.join(dirname, 'dist')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(dirname, 'dist', 'index.html'));
  });

  app.use(notFound);
  app.use(errorHandler);

  startServer(app);
};

export default initApp;
