import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class Authentication {
  async authenticate (request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers
    if (!authorization) { return response.status(401).json({ failure: 'No token provided' }) }
    const token = authorization.replace('Bearer', '').trim()
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
      const { id } = data as ITokenPayload
      request.userId = id
      return next()
    } catch (err) {
      return response.status(401).json({ failure: 'No token provided' })
    }
  }
}

export default new Authentication()
