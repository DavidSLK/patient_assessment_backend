import { Request, Response } from 'express'
import { ParsedQs } from 'qs'
import { FindManyOptions, getRepository, Like } from 'typeorm'
import { User } from '@entities/User'

type UserRequest = {
  fullname: string
  document: string
  birth_date: Date
  email: string
  password: string
  isRootUser: string
  results: string
  created_at: Date
  updated_at: Date
}

type Result = {
  id: string
  userId: string,
  answer: string
  created_at: Date
  update_at: Date
}


type UserQueryTypes = ParsedQs & FindManyOptions<User> & {
  page: string
  keyword: string
}

class UserController {
  async index (request: Request, response: Response) {
    const repository = getRepository(User)
    const { take, keyword } = request.query as UserQueryTypes;
    const userExists = await repository.findOne(request.userId)

    if(userExists) {
      if (userExists.isRootUser) {
        try {
          const [users, total] = await repository.findAndCount({
            where: keyword ? {
              fullname: Like(`%${keyword}%`),
              isRootUser: false
             } : {
              isRootUser: false
             },
            order: { fullname: 'ASC' },
            relations: ['results'],
            take
          })

          if (users) {
            users.map(user => {
              delete user.password
              delete user.isRootUser
            })
          }

          return response.status(200).json(users)
        } catch (error) {
          return response.status(400).json({
            failure: `[UserController.index()] Unable to fetch all users from 
            database. because of the error: ${error}` 
          })
        }
      } else {
        return response.status(401).json({
          warning: `You do not have a super user permission to access the system.` 
        })
      }
    } else {
      return response.status(404).json({
        warning: `No users were found in our database.` 
      })
    }
  }

  async show (request: Request, response: Response) {
    const repository = getRepository(User)
    const userExists = await repository.findOne(request.userId)

    if(userExists) {
      if (userExists.isRootUser) {
        try {
          const user = await repository.findOne({ 
            where: {
              id: request.params.userId,
              isRootUser: false
            },
            relations: ['results']
          })

          if (user) {
            delete user.isRootUser
          }
  
          return response.status(200).json(user)
        } catch (error) {
          console.log(error)
        }
      } else {
        return response.status(401).json({ warning: "You're not allowed to access the system" })
      }
    } else {
      return response.status(404).json({ warning: 'User not found' })
    }
  }

  async store (request: Request, response: Response) {
    const repository = getRepository(User)
    const {
      document,
      email,
      fullname,
      password,
      birth_date
    } = request.body as UserRequest

    try {
      const searchedByEmail = await repository.findOne({ where: { email } })
      const searchedByDocument = await repository.findOne({ where: { document } })

      if (searchedByEmail) {
        return response.status(409).json({ warning: 'the e-mail you entered is already registered' })
      } else if (searchedByDocument) {
        return response.status(409).json({ warning: 'the document you entered is already registered' })
      }
    } catch (err) {
      console.log(`Unable to fetch email or document from database. err: ${err}`)
    }

    const user = repository.create({
      document,
      email,
      fullname,
      password,
      birth_date
    })

    await repository.save(user)
    return response.status(200).json({ success: 'successfully registered user', fullname })
  }

  async store_root (request: Request, response: Response) {
    const repository = getRepository(User)
    const {
      document,
      email,
      fullname,
      password,
      birth_date
    } = request.body as UserRequest

    try {
      const searchedByEmail = await repository.findOne({ where: { email } })
      const searchedByDocument = await repository.findOne({ where: { document } })

      if (searchedByEmail) {
        return response.status(409).json({ warning: 'the e-mail you entered is already registered' })
      } else if (searchedByDocument) {
        return response.status(409).json({ warning: 'the document you entered is already registered' })
      }
    } catch (err) {
      console.log(`Unable to fetch email or document from database. err: ${err}`)
    }

    const user = repository.create({
      document,
      email,
      fullname,
      password,
      birth_date,
      isRootUser: true
    })

    await repository.save(user)
    return response.status(200).json({ success: 'successfully registered user', fullname })
  }

  async update (request: Request, response: Response) {
    const repository = getRepository(User)

    const userExists = await repository.findOne(request.userId)
    
    if(userExists) {
      if (userExists.isRootUser) {
        const existingUser = await repository.findOne(request.params.userId)

        if (!existingUser) {
          return response.status(404).json({ warning: 'User not found' })
        }

        const alteredClient = repository.merge(existingUser, request.body)

        await repository.save(alteredClient)
        return response.status(200).json(alteredClient.id)
      } else {
        return response.status(401).json({ warning: "You're not allowed to access the system" })
      }
    } else {
      return response.status(404).json({ warning: 'User not found' })
    }
  }

  async destroy (request: Request, response: Response) {
    const repository = getRepository(User)
    const userExists = await repository.findOne(request.userId)

    if(userExists) {
      if (userExists.isRootUser) {
        await repository.delete(request.params.userId)
        return response.status(200).json({ success: 'The user has successfully deleted' })
      } else {
        return response.status(401).json({ warning: "You're not allowed to access the system" })
      }
    } else {
      return response.status(404).json({ warning: 'User not found' })
    }
  }
}

export default new UserController()
