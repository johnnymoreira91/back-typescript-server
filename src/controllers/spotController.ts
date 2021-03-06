/* eslint-disable no-undef */
/* eslint-disable consistent-return */
// import path from 'path'
// require("dotenv").config({
//   path: path.join(__dirname, '.env')
// });
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
// import * as io from 'socket.io';

const prisma = new PrismaClient();

export default {
  async store(req: Request<{user_id: number}, {}, {spotName: string, sectorId: number,
     status: string}>, res: Response) {
    const { spotName, sectorId } = req.body;

    try {
      const sector = await prisma.sector.findFirst({
        where: { id: sectorId },
      });

      if (sector == null) {
        return res.status(400).json({ msg: `Sector with id: ${sectorId} Not Found!!!` });
      }

      if (sector) {
        const spot = await prisma.spot.create({
          data: {
            spotName,
            sectorId: sector.id,
          },
        });
        const spotC = await prisma.spot.findMany();
        io.emit('spots', spotC);
        return res.status(200).json({ spot });
      }
      return res.status(400).json({ Error: 'error to add a new spot' });
    } catch (error) {
      return res.status(400).json({ Error: error });
    }
  },

  // eslint-disable-next-line no-unused-vars
  async getAllSpot(req: Request<{}, {}, {}>, res: Response) {
    try {
      const spot = await prisma.spot.findMany();
      io.emit('spots', spot);
      return res.status(200).json(spot);
    } catch (error) {
      res.status(400).json({ msg: 'Error to find spots' });
    }
  },

  async getSpotById(req: Request<{spotId: string}, {}, {}>, res: Response) {
    const { spotId } = req.params;
    try {
      const spot = await prisma.spot.findFirst({
        where: { uuidSpot: spotId },
      });
      return res.status(200).json(spot);
    } catch (error) {
      res.status(400).json({ msg: 'Error to find spots' });
    }
  },

  async edit(req: Request<{spotId: string}, {}, {spotName: string, sectorId: number
  status: any}>, res: Response) {
    const { spotName, status } = req.body;
    const { spotId } = req.params;

    try {
      const findSpot = await prisma.spot.findFirst({
        where: { uuidSpot: spotId },
      });

      if (findSpot == null) {
        return res.status(404).json({ msg: 'spot doenst exist' });
      }

      const sector = await prisma.sector.findFirst({
        where: { id: findSpot.sectorId },
      });

      if (sector) {
        const spot = await prisma.spot.update({
          where: { id: findSpot.id },
          data: {
            spotName,
            sectorId: sector.id,
            status: status || 'Error',
          },
        });
        const spotC = await prisma.spot.findMany();
        io.emit('spots', spotC);
        return res.status(200).json({ spot });
      }
      return res.status(400).json({ Error: 'error to add a new spot' });
    } catch (error) {
      return res.status(400).json({ Error: 'Email or Password doenst exist' });
    }
  },
};
