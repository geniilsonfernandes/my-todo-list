import { z } from 'zod';
import { TaskStatus } from '../../../api/tasks/tasksMethods';

export const taskSchema = z.object({
  todo: z.string().min(3, 'O nome da tarefa deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  status: z.enum(TaskStatus),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data inválida',
  }),
});
