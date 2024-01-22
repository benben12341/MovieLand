const config = require('config');
const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const { connectDB } = require('./config/db');

const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { importData } = require('./seeder');
const socketio = require('socket.io');
const http = require('http');

dotenv.config();

connectDB();

const app = express();

app.use(cors());

// log request
app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, '/backend/uploads')));

app.use(notFound);
app.use(errorHandler);

const port = config.get('app.port') || 5000;
// importData()

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let interval;

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response);
};

io.on('connection', (socket) => {
  console.log('New client connected');
  io.emit('clients', io.engine.clientsCount);
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    socket.broadcast.emit('clients', io.engine.clientsCount);
    clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Server is listening on ${port}.`));
