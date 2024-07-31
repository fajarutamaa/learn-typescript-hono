import { Context } from 'hono'

export const errorHandler = (c: Context) => {
  console.log(c.res.status)

  return c.json({
    success: false,
    message: c.error?.message,
  })
}

export const notFound = (c: Context) => {
  return c.json({
    success: false,
    message: `not found - [${c.req.method} ${c.req.url}]`,
  })
}
