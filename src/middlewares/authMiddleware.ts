import { createMiddleware } from 'hono/factory'
import prisma from '../../prisma/client'
import { validateToken } from '../utils/jwt'
import { Error401 } from '../helpers/error'

export const checkUserToken = () => {
  return createMiddleware(async (c, next) => {
    const authHeader = c.req.header('Authorization')

    if (!authHeader) {
      let response = Error401(false, 'not allowed. Authorization header is required')
      return c.json(response, 401)
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      let response = Error401(false, 'not allowed. Token is required')
      return c.json(response, 401)
    }

    const decodedToken = await validateToken(token)
    if (!decodedToken) {
      let response = Error401(false, 'not allowed. Token is invalid')
      return c.json(response, 401)
    }

    const userId = decodedToken.subject
    if (!userId) {
      let response = Error401(false, "user id doesn't exist")
      return c.json(response, 401)
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { id: true },
    })
    if (!user) {
      c.status(404)
      return c.json({ message: 'User not found' })
    }

    c.set('user', user)

    await next()
  })
}
