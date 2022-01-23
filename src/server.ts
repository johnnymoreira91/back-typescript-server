/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import express from 'express';
// import * as socketio from 'socket.io';
import standarRoute from '@routes/standarRoute';
import sectorRoute from '@routes/sectorRoute';
import spotRoute from '@routes/spotRoute';
import cors from 'cors';

const app = express();

// app.get('/home', (req, res) => res.status(200).json({ message: 'hello' }));

// app.get('/teste', (req, res) => {
//   res.status(200).json({ message: 'teste' });
// });

app.use(express.json());
app.use(cors());
app.use('/', standarRoute);
app.use('/sector', sectorRoute);
app.use('/spot', spotRoute);
app.use('/', express.static('src/public'));

const server = app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('running');
});

const io = require('socket.io')(server);

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

io.on('connection', (socket: any) => {
  console.log('a user connected');
  // whenever we receive a 'message' we log it out
  socket.on('message', (message: any) => {
    console.log(message);
  });
});
