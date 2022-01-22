/* eslint-disable consistent-return */
// import path from 'path'
// require("dotenv").config({
//   path: path.join(__dirname, '.env')
// });
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  async store(req: Request<{}, {}, {name: string}>, res: Response) {
    // const { name } = req.body;

    try {
      const sector = await prisma.sector.create({
        data: {
          sectorName: req.body.name,
        },
      });
      return res.status(200).json({ sector });
    } catch (error) {
      return res.status(400).json({ Error: 'erro to add sector', err: error });
    }
  },

  // eslint-disable-next-line no-unused-vars
  async getAllSectors(req: Request<{}, {}, {}>, res: Response) {
    try {
      const sector = await prisma.sector.findMany();
      return res.status(200).json(sector);
    } catch (error) {
      res.status(400).json({ msg: 'Error to find sectors' });
    }
  },

  async getBySectors(req: Request<{sectorId: string}, {}, {sectorName: string}>, res: Response) {
    const { sectorId } = req.params;
    try {
      const sector = await prisma.sector.findFirst({
        where: { uuidSector: sectorId },
      });
      return res.status(200).json(sector);
    } catch (error) {
      res.status(400).json({ msg: 'Error to find sectors' });
    }
  },

  async edit(req: Request<{sectorId: string}, {}, {sectorName: string}>, res: Response) {
    const { sectorId } = req.params;
    const { sectorName } = req.body;
    try {
      const sector = await prisma.sector.update({
        where: { uuidSector: sectorId },
        data: {
          sectorName,
        },
      });
      return res.status(200).json({ sector });
    } catch (error) {
      return res.status(400).json({ Error: 'Email or Password doenst exist' });
    }
  },

  async delete(req: Request<{sectorId: string}, {}, {}>, res: Response) {
    const { sectorId } = req.params;
    try {
      await prisma.sector.delete({
        where: { uuidSector: sectorId },
      });
      return res.status(201).json({ msg: 'sector deleted' });
    } catch (error) {
      return res.status(400).json({ Error: 'Email or Password doenst exist' });
    }
  },

};
