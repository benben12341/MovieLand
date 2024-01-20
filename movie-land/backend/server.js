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
const messageRoutes = require('./routes/messageRoutes');
const { createMessage } = require('./controllers/messageController');

const { importData } = require('./seeder');
const socketio = require('socket.io');
const http = require('http');
const { log } = require('console');

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
app.use('/api/messages', messageRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const port = config.get('app.port') || 5000;
// importData()

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on('connection', socket => {
  socket.on('new-message', message => {
    createMessage(message);
    io.emit('update-messages', message);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('clients', io.engine.clientsCount);
  });
});

server.listen(port, () => console.log(`Server is listening on ${port}.`));
