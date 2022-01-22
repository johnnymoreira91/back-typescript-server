/* eslint-disable consistent-return */
// import path from 'path'
// require("dotenv").config({
//   path: path.join(__dirname, '.env')
// });
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  async login(req: Request<{user_id: number}, {}, {email: string, password: string}>, res: Response) {
    const { email, password } = req.body;

    try {
      if (email === 'admin' && password === '123') {
        // eslint-disable-next-line no-console
        console.log('logou');
        return res.status(200).json({ msg: 'logado' });
      }
      res.status(403).json({ msg: 'Error user/password' });
    } catch (error) {
      return res.status(400).json({ Error: 'Email or Password doenst exist' });
    }
  },

  // eslint-disable-next-line no-unused-vars
  async getUsers(req: Request<{}, {}, {}>, res: Response) {
    try {
      const user = await prisma.user.findMany();
      return res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ msg: 'Error to find users' });
    }
  },
};
