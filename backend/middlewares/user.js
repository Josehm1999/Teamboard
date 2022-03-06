import User from '../models/user.js';
import mongoose from 'mongoose';

const existingUser = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  return existingUser
    ? res.status(400).send({ message: 'The user is already registered' })
    : next();
};
const validData = async (req, res, next) => {
  return !req.body.name || !req.body.email || !req.body.password
    ? res.status(400).send({ message: 'Incomplete data' })
    : next();
};
const isRoleValid = async (req, res, next) => {
  const validate = mongoose.Types.ObjectId.isValid(req.body.role);
  return !req.body.role || !validate
    ? res.status(400).send({ message: 'Role is not valid' })
    : next();
};

const isEmailValid = async (req, res, next) => {
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!req.body.email) {
    return !regex.test(req.params.email)
      ? res.status(400).send({ message: 'Invalid email' })
      : next();
  } else {
    return !regex.test(req.body.email)
      ? res.status(400).send({ message: 'Invalid email' })
      : next();
  }
};

export { existingUser, validData, isRoleValid, isEmailValid };
