import { z } from 'zod'

export const createFormSchema = z.object({
  name: z.string().min(1, 'Este campo es requerido'),
  description: z.string().optional(),
  allowedDomains: z.string().optional(),
  redirectUrl: z
    .string()
    .url('Ingresa una URL válida')
    .optional()
    .or(z.literal('')),
  successMessage: z.string().optional(),
})

export type CreateFormFormData = z.infer<typeof createFormSchema>
