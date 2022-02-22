import express from 'express';

import {
  deleteTask,
  listTasks,
  registerTask,
  updateTask,
} from '../controllers/taskController.js';
const router = express.Router();

router.post('/registerTask', registerTask);
router.get('/listTasks/:name?', listTasks);
router.delete('/delete/:_id', deleteTask);
router.put('/updateTaskAdmin', updateTask);
export default router;
