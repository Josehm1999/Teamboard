import role from "../models/role.js";

const existingRole = async (req, res, next) => {
  const roleId = await role.findOne({ name: "user" });
  if (!roleId) return res.stauts(500).send({ message: "No role was assigned" });
  req.body.role = roleId._id;
  next();
};

export { existingRole };
