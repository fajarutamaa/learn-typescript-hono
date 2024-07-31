import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { errorHandler, notFound } from './middlewares'
import { Articles, Auth } from './routes'

const port = Bun.env.PORT || 3000
const app = new Hono().basePath('/api/v1')

app.use('*', logger())
app.use('*', prettyJSON())
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
)

app.onError((err, c) => {
  const error = errorHandler(c)
  return error
})

app.notFound((c) => {
  const error = notFound(c)
  return error
})

app.route('/articles', Articles)
app.route('/auth', Auth)
app.get('/', (c) => c.text('Welcome to the API ✨🚀'))

export default {
  port,
  fetch: app.fetch,
}
