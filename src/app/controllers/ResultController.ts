import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Result } from '@entities/Result'
import { User } from '@entities/User'

interface ResultRequest {
  answers: string
}

class ResultController {
  async index (request: Request, response: Response) {
    const resultRepository = getRepository(Result)
    const userRepository = getRepository(User)
    const { userId } = request.params

    try {
      const user = await userRepository.findOne(userId)

      try {
        const results = await resultRepository.find({
          where: { user },
          order: { updated_at: 'ASC' }
        })
        return response.status(200).json({ results })
      } catch (error) {
        return response.status(400).json({
          failure: `[ResultController.index()] It was not possible to search for 
          all results in the database. because of the error: ${error}` 
        })
      }
    } catch (error) {
      return response.status(400).json({
        failure: `[ResultController.index()] Unable to search the database for 
        the user. because of the error: ${error}` 
      })
    }
  }

  async show (request: Request, response: Response) {
    const repository = getRepository(Result)
    const { resultId } = request.params
    try {
      const result = await repository.findOne({
        where: { id: resultId },
        relations: ['user']
      })
  
      return response.status(200).json(result)
    } catch (error) {
      return response.status(400).json({
        failure: `[ResultController.show()] Unable to search the database for 
        the result. because of the error: ${error}` 
      })
    }
  }

  async store (request: Request, response: Response) {
    const resultRepository = getRepository(Result)
    const userRepository = getRepository(User)
    const { userId } = request.params
    const { answers } = request.body as ResultRequest

    try {
      const user = await userRepository.findOne(userId)

      try {
        const result = resultRepository.create({
          answers,
          user
        })
        await resultRepository.save(result)
        return response.status(200).json(result)
      } catch (error) {
        return response.status(400).json({
          failure: `[ResultController.store()] It was not possible to register a 
          new result for patient in our database. because of the error: ${error}` 
        })
      }
    } catch (error) {
      return response.status(400).json({
        failure: `[ResultController.store()] Unable to search for specified user. 
        because of the error: ${error}` 
      })
    }

  }

  async update (request: Request, response: Response) {
    const resultRepository = getRepository(Result)
    const { resultId } = request.params

    try {
      const existingResult = await resultRepository.findOne(resultId)
      
      if (!existingResult) {
        return response.status(404).json({
          warning: 'No results found matching the entered id.'
        })
      }

      try {
        const alteredResult = resultRepository.merge(existingResult, request.body)

        await resultRepository.save(alteredResult)
        return response.status(200).json(alteredResult)
      } catch (error) {
        return response.status(400).json({
          failure: `[ResultController.update()] Unable to update result based on 
          past values. because of the error: ${error}` 
        })
      }
    } catch (error) {
      return response.status(400).json({
        failure: `[ResultController.update()] It was not possible to search the 
        result by the informed id. because of the error: ${error}` 
      })
    } 
  }

  async destroy (request: Request, response: Response) {
    const repository = getRepository(Result)
    const { resultId } = request.params

    try {
      await repository.delete(resultId)
      return response.status(200).json({
        success: `The result with Id ${resultId} was successfully deleted.`
      })
    } catch (error) {
      return response.status(400).json({
        failure: `[ResultController.destroy()] Unable to delete the specified 
        result. because of the error: ${error}` 
      })
    }
  }
}

export default new ResultController()
