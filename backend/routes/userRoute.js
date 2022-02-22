import express from 'express';

import userController from '../controllers/userController.js';
import { existingUser } from '../middleware/userValidate.js';
import { existingRole } from '../middleware/roleValidate.js';
const router = express.Router();

router.post(
  '/registerUser',
  [existingUser, existingRole],
  userController.registerUser
);
router.post('/userLogin', userController.login);
router.get('/listUser/:name?', userController.listUsers);
router.get('/listAdmin/:name?', userController.listUserAdmin);
router.delete('/delete/:_id', userController.deleteUser);
router.put('/updateUserAdmin', userController.updateUserAdmin);
export default router;
