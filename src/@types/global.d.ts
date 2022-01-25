/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable import/no-duplicates */
import * as socketIo from 'socket.io';

declare global {
  let io: socketIo.Server;
  // let user_socket: socketIo.Socket;
}

// declare namespace global {
//   export interface Request {
//       io: socketIo.Server;
//   }
// }
