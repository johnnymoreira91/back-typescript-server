/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import express from 'express';
// import * as socketio from 'socket.io';
import standarRoute from '@routes/standarRoute';
import sectorRoute from '@routes/sectorRoute';
import spotRoute from '@routes/spotRoute';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

// app.get('/home', (req, res) => res.status(200).json({ message: 'hello' }));

// app.get('/teste', (req, res) => {
//   res.status(200).json({ message: 'teste' });
// });

let bigData: any;
app.get('/data', async (req: any, res: any) => {
  try {
    const sector = await prisma.sector.findMany();
    console.log(sector);
    bigData = sector;
    console.log(bigData);
    return res.status(200).json(sector);
  } catch (error) {
    return res.status(400).json('error');
  }
});

// const allowedOrigins = ['http://localhost:3000',
//   'http://localhost:3001'];
// app.use(cors({
//   origin(origin, callback) {
//     // allow requests with no origin
//     // (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not '
//                 + 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
// }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // Quais são os métodos que a conexão pode realizar na API
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});
// app.use(cors());
app.use(express.json());
app.use('/', standarRoute);
app.use('/sector', sectorRoute);
app.use('/spot', spotRoute);
app.use('/', express.static('src/public'));

const server = app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('running');
});

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

const os = require('os');

const ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach((ifname) => {
  let alias = 0;

  ifaces[ifname].forEach((iface: { family: string; internal: boolean; address: any; }) => {
    if (iface.family !== 'IPv4' || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(`${ifname}:${alias}`, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    // eslint-disable-next-line no-plusplus
    ++alias;
  });
});

// io.on('connection', (socket: any) => {
//   console.log('a user connected');
//   // whenever we receive a 'message' we log it out
//   socket.on('message', (message: any) => {
//     console.log(message);
//   });

//   socket.on('data', (data: any) => {
//     console.log(data);
//     socket.emit('big', bigData);
//   });
// });

// const activeUsers = new Set();

io.on('connection', (socket: any) => {
  console.log('Made socket connection');

  socket.emit('connection', bigData);
});
