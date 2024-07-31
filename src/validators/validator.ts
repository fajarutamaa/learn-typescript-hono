import { z, ZodError } from 'zod'
import { StatusCodes } from 'http-status-codes'
import type { Context, Next } from 'hono'

export function validateData(schema: z.ZodObject<any, any>) {
  return async (c: Context, next: Next) => {
    try {
      schema.parse(c.req)
      await next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        return c.json({ error: 'Invalid data', details: errorMessages }, StatusCodes.BAD_REQUEST)
      } else {
        return c.json({ error: 'Internal Server Error' }, StatusCodes.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
