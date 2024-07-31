import { Hono } from 'hono'
import { article } from '../controllers'
import { validateData } from '../validators/validator'
import { ArticlesSchema } from '../schemas/schemas'
import { checkUserToken } from '../middlewares'

const articles = new Hono()

articles.get('/', checkUserToken(), (c) => article.fetchAllArticles(c))
articles.get('/:id', checkUserToken(), (c) => article.getArticleById(c))
articles.post('/', checkUserToken(), validateData(ArticlesSchema), (c) => article.addArticles(c))

export default articles
