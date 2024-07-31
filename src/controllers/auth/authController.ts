import { Context } from 'hono'
import { Json200, Json201 } from '../../helpers/response'
import { Error400, Error404 } from '../../helpers/error'
import { hashPassword, verifyPassword } from '../../utils/password'
import { createToken } from '../../utils/jwt'
import prisma from '../../../prisma/client'

export const RegisterUser = async (c: Context) => {
  const body = await c.req.parseBody()

  try {
    const { username, email, password } = body as {
      username: string
      email: string
      password: string
    }

    await prisma.user.create({
      data: {
        username,
        email,
        password: {
          create: {
            hash: await hashPassword(password),
          },
        },
      },
    })
    let response = Json201(true, 'created user has successfully')
    return c.json(response, 201)
  } catch (error) {
    let response = Error400(false, 'cannot register user')
    return c.json(response, 400)
  }
}

export const Login = async (c: Context) => {
  const body = await c.req.parseBody()
  try {
    const { username, password } = body as {
      username: string
      password: string
    }

    const user = await prisma.user.findUnique({
      where: { username },
      include: { password: { select: { hash: true } } },
    })

    if (!user) {
      let response = Error404(false, 'user not found')
      return c.json(response, 404)
    }

    if (!user?.password?.hash) {
      let response = Error400(false, 'invalid request')
      return c.json(response, 400)
    }

    const validPassword = await verifyPassword(user.password.hash, password)

    if (!validPassword) {
      let response = Error400(false, 'password incorrect')
      return c.json(response, 400)
    }

    const token = await createToken(user.id.toString())

    if (!token) {
      let response = Error400(false, 'token failed to created')
      return c.json(response, 400)
    }

    let response = Json200(true, { token: token }, 'login successfully')
    return c.json(response, 200)
  } catch (e: unknown) {
    console.error(e)
  }
}

export const Logout = async (c: Context) => {
  return c.json({
    message: 'Logout',
  })
}
