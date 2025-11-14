import { z } from 'zod';

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }).min(1, 'Title cannot be empty'),
  }),
});

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().cuid('Invalid ID format'),
  }),
  body: z.object({
    title: z.string().min(1, 'Title cannot be empty').optional(),
    completed: z.boolean().optional(),
  }).strict().refine(data => Object.keys(data).length > 0, {
    message: 'Request body must not be empty',
  }),
});

export const todoIdParamSchema = z.object({
  params: z.object({
    id: z.string().cuid('Invalid ID format'),
  }),
});