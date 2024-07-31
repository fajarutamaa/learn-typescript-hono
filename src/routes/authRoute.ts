import { Hono } from 'hono'
import { auth } from '../controllers'
import { validateData } from '../validators/validator'
import { UserLoginSchema, UserSchema } from '../schemas/schemas'
import { checkUserToken } from '../middlewares'

const user = new Hono()

user.post('/register', validateData(UserSchema), (c) => auth.RegisterUser(c))
user.post('/login', validateData(UserLoginSchema), (c) => auth.Login(c))
user.post('/logout', checkUserToken(), (c) => auth.Logout(c))

export default user
