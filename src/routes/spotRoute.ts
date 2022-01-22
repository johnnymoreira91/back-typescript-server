// eslint-disable-next-line import/no-unresolved
import spotController from '@controllers/spotController';
import express from 'express';

const router = express.Router();

router.get('/list', spotController.getAllSpot);
router.get('/:spotId', spotController.getSpotById);
router.post('/', spotController.store);
router.put('/:spotId', spotController.edit);

export default router;
