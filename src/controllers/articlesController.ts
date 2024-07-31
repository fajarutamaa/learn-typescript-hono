import { Context } from 'hono'
import { Json200, Json201 } from '../helpers/response'
import { Error400, Error404 } from '../helpers/error'
import prisma from '../../prisma/client'

export const fetchAllArticles = async (c: Context) => {
  try {
    const data = await prisma.articles.findMany()
    let response = Json200(true, data, 'success')
    return c.json(response, 200)
  } catch (e: unknown) {
    console.error(`Error fetch data: ${e}`)
  }
}

export const addArticles = async (c: Context) => {
  const body = await c.req.parseBody()

  try {
    const { title, content } = body as {
      title: string
      content: string
    }

    if (!title || !content) {
      let response = Error400(false, 'invalid request')
      return c.json(response, 400)
    }

    const user = c.get('user')

    await prisma.articles.create({
      data: {
        title,
        content,
        user_id: user.id,
      },
    })

    let response = Json201(true, 'created article has successfully')
    return c.json(response, 201)
  } catch (e: unknown) {
    console.error(`Error fetch data: ${e}`)
  }
}

export const getArticleById = async (c: Context) => {
  try {
    const id_article = parseInt(c.req.param('id'))

    if (isNaN(id_article)) {
      let response = Error404(false, 'invalid article ID')
      return c.json(response, 400)
    }

    const article = await prisma.articles.findUnique({
      where: { id: id_article },
    })

    if (!article) {
      let response = Error404(false, 'article not found')
      return c.json(response, 404)
    }

    let response = Json200(true, article, 'Success')
    return c.json(response, 200)
  } catch (e: unknown) {
    console.error(`Error fetching data: ${e}`)
    let response = { success: false, message: 'Internal server error' }
    return c.json(response, 500)
  }
}
