import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
} from '../controllers/userController';

import { login } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser);

export default router;
