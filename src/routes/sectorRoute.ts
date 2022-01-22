// eslint-disable-next-line import/no-unresolved
import sectorController from '@controllers/sectorController';

import express from 'express';

const router = express.Router();

router.get('/list', sectorController.getAllSectors);
router.get('/:sectorId', sectorController.getBySectors);
router.post('/', sectorController.store);
router.put('/:sectorId', sectorController.edit);
router.delete('/:sectorId', sectorController.delete);

export default router;
