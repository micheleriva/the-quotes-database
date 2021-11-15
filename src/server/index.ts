import express, { Application } from 'express'
import cors from 'cors'
import { quotes } from './routes'
require('dotenv').config()

const app  = express()
const port = process.env.NODE_PORT || 3000

/**
 * @function start
 * @returns {void}
 * @description Starts the HTTP Express server.
 */

export function start(): void {
  app.use(cors())
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use('/quotes', quotes)
    .use((_req, res) => res.status(404).json({ success: false,error: 'Route not found' }))
    .listen(port, () => console.log(`Server ready on port ${port}`));
}
