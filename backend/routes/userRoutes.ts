import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
} from '../controllers/userController';

import {
  login,
  logout,
  protect,
  restrictTo,
  signup,
} from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);

// Protect all the routes that follows below
router.use(protect);

router.use(restrictTo('admin'));
router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);

export default router;
