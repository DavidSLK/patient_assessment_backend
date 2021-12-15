import { Router } from 'express'

import UserController from '@controllers/UserController'
import AuthController from '@controllers/AuthController'
import ResultController from '@controllers/ResultController'

import Authentication from '@middlewares/Authentication'

const routes = Router()

// => Authentication Routes
routes.post('/authenticate', AuthController.authenticate)

// => User Routes
routes.get('/users', Authentication.authenticate, UserController.index)
routes.get('/users/:userId', Authentication.authenticate, UserController.show)
routes.post('/users', UserController.store)
routes.post('/users/root', UserController.store_root)
routes.put('/users/:userId', Authentication.authenticate, UserController.update)
routes.delete('/users/:userId', Authentication.authenticate, UserController.destroy)

// => Result Routes
routes.get('/results', Authentication.authenticate, ResultController.index)
routes.get('/results/:resultId', Authentication.authenticate, ResultController.show)
routes.post('/results/:userId', Authentication.authenticate, ResultController.store)
routes.put('/results/:resultId', Authentication.authenticate, ResultController.update)
routes.delete('/results/:resultId', Authentication.authenticate, ResultController.destroy)

export { routes }