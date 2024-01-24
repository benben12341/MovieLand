const config = require('config');
const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const https = require('https');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const { connectDB } = require('./config/db');

const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { createMessage } = require('./controllers/messageController');

const { importData } = require('./seeder');
const socketio = require('socket.io');
const { log } = require('console');

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/messages', messageRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const port = config.get('app.port') || 5000;

let server;
if (process.env.NODE_ENV !== 'production') {
  console.log(`development:${port}`);
  server = http.createServer(app).listen(port);
} else {
  const options = {
    key: fs.readFileSync('./client-key-pem'),
    cert: fs.readFileSync('./client-cert.pem')
  };
  server = https.createServer(options, app).listen(443);
}

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:9090'
  },
});

io.on('connection', (socket) => {
  socket.on('new-message', (message) => {
    createMessage(message);
    io.emit('update-messages', message);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('clients', io.engine.clientsCount);
  });
});
