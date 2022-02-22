import Response from 'express'
import role from '../models/role.js'

const registerRole = async (req, res = Response) => {
  const { name, description } = req.body
  const roleDB = await role.findOne({ name })

  if (!name || !description)
    return res.status(400).send({
      message: 'Incomplete data',
    })

  if (roleDB) {
    return res.status(400).send({
      message: `El rol ${name} ya existe.`,
    })
  }

  let schema = new role({
    name,
    description,
  })

  let result = await schema.save()
  if (!result)
    return res.status(500).send({ message: 'Failed to register role' })

  return res.status(200).send({ result })
}

const listRoles = async (_, res = Response) => {
  const roles = await role.find({})

  if (roles.length === 0)
    return res.status(500).send({ message: 'Failed to get roles' })

  return res.status(200).send({ roles })
}

export { registerRole, listRoles }
