import { AccountController } from '../controllers'
import express, { Router } from 'express'

const accountRoute: Router = express.Router()

const { register, login, tailNumber } = AccountController

accountRoute.post('/signup', register)
accountRoute.post('/login', login)
accountRoute.get('/tailNumber', tailNumber)

export default accountRoute


