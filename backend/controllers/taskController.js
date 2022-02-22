import Response from 'express';
import task from '../models/task.js';

const registerTask = async (req, res = Response) => {
  const { user, name, description, imageUrl } = req.body;
  const taskDB = await task.findOne({ name });

  if (!user || !name || !description)
    return res.status(400).send({
      message: 'Incomplete data',
    });

  if (taskDB) {
    return res.status(400).send({
      message: `El rol ${name} ya existe.`,
    });
  }

  let schema = new task({
    user,
    name,
    description,
    imageUrl,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: 'Failed to register task' });

  return res.status(200).send({ result });
};

const listTasks = async (req, res = Response) => {
  const tasks = await task.find({ name: new RegExp(req.params['name']) });

  if (tasks.length === 0)
    return res.status(500).send({ message: 'No results were found' });

  return res.status(200).send({ tasks });
};

const deleteTask = async (req, res = Response) => {
  if (!req.params['_id'])
    return res.status(400).send({ message: 'Incomplete data' });

  const tasks = await task.findByIdAndDelete(req.params['_id']);
  return !tasks
    ? res.status(500).send({ message: 'Error deleting task' })
    : res.status(200).send({ message: 'Task deleted' });
};

const updateTask = async (req, res = Response) => {
  const { _id, taskStatus, imageUrl } = req.body;
  const statuses = ['to-do', 'in-progress', 'finished'];
  if (!_id || !taskStatus)
    return res.status(400).send({ message: 'Incomplete data' });

  if (!statuses.includes(taskStatus))
    return res
      .status(400)
      .send({ message: `Wrong status. Valid statuses for task: ${statuses}` });

  const editTask = await task.findByIdAndUpdate(_id, {
    taskStatus,
    imageUrl,
  });

  return !editTask
    ? res.status(500).send({ message: 'Error updating task' })
    : res.status(200).send({ message: 'Task updated' });
};
export { registerTask, listTasks, deleteTask, updateTask };
