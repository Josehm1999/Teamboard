import express from 'express';
import user from '../controllers/user.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import {
  existingUser,
  validData,
  isEmailValid,
  isRoleValid,
} from '../middlewares/user.js';
import roleMidd from '../middlewares/role.js';
import validId from '../middlewares/validId.js';

const router = express.Router();

router.post(
  '/register',
  [isEmailValid, validData, existingUser, roleMidd.getRoleUser],
  user.registerUser
);
router.post(
  '/registerAdminUser',
  [isEmailValid, isRoleValid, auth, admin, existingUser],
  user.registerAdminUser
);
router.post('/login', [isEmailValid], user.login);
router.get('/listUsers/:name?', [auth, admin], user.listAllUser);
router.get('/getRole/:email', [auth, isEmailValid], user.getUserRole);
router.get('/findUser/:_id', [auth, validId, admin], user.findUser);
router.put(
  '/updateUser',
  [isEmailValid, isRoleValid, auth, admin],
  user.updateUser
);
router.put('/deleteUser/:_id', [auth, admin], user.deleteUser);

export default router;
