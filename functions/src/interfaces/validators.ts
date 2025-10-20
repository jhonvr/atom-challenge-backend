import { z } from 'zod';

export const emailUserSchema = z.object({
  email: z.string().trim().email(),
});

export const queryUserIdSchema = z.object({
  userId: z.string().min(1),
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500).optional(),
});

export const updateTaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500).optional(),
  completed: z.boolean().optional(),
});
