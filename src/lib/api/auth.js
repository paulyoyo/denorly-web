import { api } from './client'

export async function login(credentials) {
  const response = await api.post('/auth/login', {
    user: {
      email: credentials.email,
      password: credentials.password,
    },
  })

  const token =
    response.data.token ??
    response.headers.authorization?.replace('Bearer ', '')
  const user = response.data.user ?? response.data

  if (!token) {
    throw new Error('No se recibió token de autenticación')
  }

  return { user, token }
}

export async function register(registerData) {
  const { data } = await api.post('/auth/register', {
    user: {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      passwordConfirmation: registerData.passwordConfirmation,
      companyName: registerData.companyName,
    },
  })
  return data
}

export async function logout() {
  await api.delete('/auth/logout')
}

export async function forgotPassword(email) {
  await api.post('/auth/password', { user: { email } })
}

export async function resetPassword(resetData) {
  await api.put('/auth/password', {
    user: {
      resetPasswordToken: resetData.token,
      password: resetData.password,
      passwordConfirmation: resetData.password,
    },
  })
}

export async function getMe() {
  const { data } = await api.get('/me')
  return data.user ?? data
}

export async function updateMe(updateData) {
  const { data } = await api.patch('/me', {
    user: {
      name: updateData.name,
      companyName: updateData.companyName,
    },
  })
  return data.user ?? data
}
