import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import user from '../models/user.js';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).send({ message: 'Incomplete Data' });

  const passHash = await bcrypt.hash(password, 10);
  const userSchema = new user({
    name,
    email,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await userSchema.save();

  if (!result)
    return res.status(500).send({ message: 'Failed to register user' });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (error) {
    return res.status(500).send({ message: 'Register error' });
  }
};

const listUsers = async (req, res = Response) => {
  const users = await user
    .find({
      $and: [{ name: new RegExp(req.params['name']) }, { dbStatus: 'true' }],
    })
    .populate('role')
    .exec();

  if (users.length === 0)
    return res.status(500).send({ message: 'No search results' });

  return res.status(200).send({ users });
};

const listUserAdmin = async (req, res = Response) => {
  const users = await user
    .find({ name: new RegExp(req.params['name']) })
    .populate('role')
    .exec();

  if (users.length === 0)
    return res.status(500).send({ message: 'No search results' });

  return res.status(200).send({ users });
};
const login = async (req, res) => {
  const userLogin = await user.findOne({
    email: req.body.email,
    dbStatus: true,
  });

  if (!userLogin)
    return res.status(400).send({ message: 'Wrong email or password' });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);

  if (!passHash)
    return res.status(400).send({ message: 'Wrong email or password' });

  try {
    // const token = generateJWT;
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (error) {
    return res.status(500).send({ message: 'Login error' });
  }
};

const deleteUser = async (req, res) => {
  if (!req.params['_id'])
    return res.status(400).send({ message: 'Incomplete data' });

  const users = await user.findByIdAndUpdate(req.params['_id'], {
    dbStatus: false,
  });

  return !users
    ? res.status(400).send({ message: 'Error deleting user' })
    : res.status(200).send({ message: 'User deleted' });
};

const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: 'Incomplete data' });

  let pass = '';

  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }

  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    role: req.body.role,
  });

  !editUser
    ? res.status(500).send({ message: 'Error editing user' })
    : res.status(200).send({ message: 'User updated' });
};

export default {
  registerUser,
  listUsers,
  login,
  deleteUser,
  listUserAdmin,
  updateUserAdmin,
};
