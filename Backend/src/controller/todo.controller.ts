import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(todos);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        title,
      },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        completed,
      },
    });
    res.json(updatedTodo);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const clearCompletedTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.todo.deleteMany({
      where: {
        completed: true,
      },
    });
    res.status(204).send();
  } catch (error) {
    logger.error(error);
    next(error);
  }
};