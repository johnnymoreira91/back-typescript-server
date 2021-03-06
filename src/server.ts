/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import express, { Request, response, Response } from 'express';
// import * as socketio from 'socket.io';
import standarRoute from '@routes/standarRoute';
import sectorRoute from '@routes/sectorRoute';
import spotRoute from '@routes/spotRoute';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const os = require('os');

const ifaces = os.networkInterfaces();
const app = express();
const server = app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('running');
});

export default server;

(global as any).io = require('socket.io')(server, {
  cors: {
    origin: '*',
    // methods: ['GET', 'POST'],
    // allowedHeaders: ['my-custom-header'],
    // credentials: true,
  },
});

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});
app.use(express.json());
app.use('/', standarRoute);
app.use('/sector', sectorRoute);
app.use('/spot', spotRoute);
app.use('/', express.static('src/public'));

/// ////////////////////////////// teste route ///////////////////////////

app.post('/post/user', (req: Request<{spotId: string}, {}, {user: string, password: string
  status: any}>, res: Response) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400);
  }
  return res.status(200);
});

/// ////////////////////////////// teste route ///////////////////////////

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

io.on('connection', async (socket: any) => {
  console.log('Made socket connection');
  const spot = await prisma.spot.findMany();
  socket.emit('spots', spot);
});
