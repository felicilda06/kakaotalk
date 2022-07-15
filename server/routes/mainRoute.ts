import express, { Request, Response } from 'express'

const mainRoute = express.Router()

mainRoute.get('/', (_req: Request, res: Response)=>{
  res.send(`Welcome to Kakaotalk Backend`)
})

export default mainRoute