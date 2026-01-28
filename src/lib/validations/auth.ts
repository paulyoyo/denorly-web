import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Este campo es requerido')
    .email('Ingresa un correo válido'),
  password: z
    .string()
    .min(1, 'Este campo es requerido')
    .min(8, 'Mínimo 8 caracteres'),
})

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Este campo es requerido'),
    email: z
      .string()
      .min(1, 'Este campo es requerido')
      .email('Ingresa un correo válido'),
    companyName: z.string().optional(),
    password: z
      .string()
      .min(1, 'Este campo es requerido')
      .min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string().min(1, 'Este campo es requerido'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Este campo es requerido')
    .email('Ingresa un correo válido'),
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Este campo es requerido')
      .min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string().min(1, 'Este campo es requerido'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
