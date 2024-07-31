import { createJWT, validateJWT } from 'oslo/jwt'
import { TimeSpan } from 'oslo'

const getSecret = async () => {
  const encoder = new TextEncoder()
  const uint8array = encoder.encode(Bun.env.TOKEN_SECRET)
  return uint8array.buffer as ArrayBuffer
}

export const createToken = async (userId: string) => {
  const secret = await getSecret()
  const payload = {}
  const options = {
    subject: userId,
    expiresIn: new TimeSpan(15, 'm'),
    includeIssuedTimestamp: true,
  }

  try {
    const jwt = await createJWT('HS256', secret, payload, options)
    return jwt
  } catch (error) {
    console.error()
    return null
  }
}

export const validateToken = async (token: string) => {
  const secret = await getSecret()

  try {
    const decodeToken = await validateJWT('HS256', secret, token)
    return decodeToken
  } catch (error) {
    console.error()
    return null
  }
}
