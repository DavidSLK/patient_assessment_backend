import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '@entities/User'

class AuthController {
  async authenticate (request: Request, response: Response) {
    const repository = getRepository(User)
    const { document, password } = request.body

    console.log(document, password)

    try {
      const user = await repository.findOne({ where: { document } })
      if (!bcrypt.compareSync(password, user.password)) {
        return response.status(401).json({ warning: "You're not allowed to access the system" })
      }
      try {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: 86400 // 1 day or 24 hours or 1440 minutes or 86400 secounds
        })
        delete user.document
        delete user.password
        return response.json({ success: 'Token successfully generated', user, token })
      } catch (err) {
        return response.json({ failure: 'could not generate token', err: err })
      }
    } catch (err) {
      return response.status(404).json({ failure: 'user not found' })
    }
  }
}

export default new AuthController()
