import { z } from 'zod';

export const authSchema = z.object({
  email: z.email({ message: 'Email inválido' }),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});