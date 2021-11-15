import express from 'express'
import * as controller from '../controllers'

export const quotes = express.Router()
  quotes.route('/')
    .get(controller.getQuotes)
    .post(controller.addQuote)
