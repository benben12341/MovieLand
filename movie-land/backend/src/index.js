import config from 'config';

import { connectDB } from './config/mongoose/index.js';
import startServer from './config/express/index.js';

const { address, name, query } = config.get('db');

connectDB(address, name, query)
  .then(() => startServer())
  .catch((error) => console.error(error));
