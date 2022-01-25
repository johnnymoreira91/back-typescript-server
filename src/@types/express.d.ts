/* eslint-disable no-unused-vars */
import * as socketIo from 'socket.io';

declare namespace Express {
  export interface Request {
      userId: string
  }
}
// declare global {
//   namespace NodeJS {
//     interface Global {
//       io: socketIo.Server
//     }
//   }
// }
