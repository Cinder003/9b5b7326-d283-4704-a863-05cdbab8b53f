import { Router } from 'express';
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  clearCompletedTodos,
} from '../controller/todo.controller';
import { validateRequest } from '../middleware/validateRequest';
import { createTodoSchema, updateTodoSchema, todoIdParamSchema } from '../models/todo.model';

const router = Router();

router.get('/', getTodos);
router.post('/', validateRequest(createTodoSchema), createTodo);
router.post('/clear-completed', clearCompletedTodos);

router.get('/:id', validateRequest(todoIdParamSchema), getTodoById);
router.put('/:id', validateRequest(updateTodoSchema), updateTodo);
router.delete('/:id', validateRequest(todoIdParamSchema), deleteTodo);

export default router;