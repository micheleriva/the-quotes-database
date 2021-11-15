import { Request, Response } from 'express'
import { QuoteData } from '../../models'
import { SearchRequest, SearchResponse } from '../../types'
import * as model from '../models'

/**
 * @function getQuotes
 * @description Handles the quotes search
 */

export async function getQuotes(
  req: SearchRequest<QuoteData>,
  res: SearchResponse<QuoteData>
): Promise<SearchResponse<QuoteData>> {
  const query  = req.query

  if (!query.text) {
    return res.status(422).json({
      success: false,
      data: "Missing required parameter: text"
    })
  }

  try {
    const result = await model.getQuotes(req.query)
    return res.json({ success: true, data: result })
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Unknown error.'})
  }
}

/**
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Promise<Response>}
 */

export async function addQuote(req: Request, res: Response): Promise<Response> {

  const body = req.body

  if (!body.quote || !body.author) return res.status(422).json({
    error: true,
    data: "Missing required parameter(s): 'body' or 'author'"
  })

  try {

    const result = await model.insertNewQuote(body.quote, body.author)
    return res.json({ 
      success: true, 
      data: {
        id:     result.body._id,
        author: body.author,
        quote:  body.quote
      } 
    })

  } catch (err) {
    return res.status(500).json({ success: false, error: 'Unknown error.'})
  }

}
