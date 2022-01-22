// eslint-disable-next-line import/no-unresolved
import standardController from '@controllers/standardController';
import express from 'express';

const router = express.Router();

router.get('/login', standardController.login);

router.get('/list', standardController.getUsers);

router.get('/teste', (req, res) => {
  res.send('ola');
});

export default router;
