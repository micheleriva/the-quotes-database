import { Request, Response } from 'express';
import { QuoteData } from '../../models';
import { SearchRequest, SearchResponse } from '../../types';
/**
 * @function getQuotes
 * @description Handles the quotes search
 */
export declare function getQuotes(req: SearchRequest<QuoteData>, res: SearchResponse<QuoteData>): Promise<SearchResponse<QuoteData>>;
/**
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Promise<Response>}
 */
export declare function addQuote(req: Request, res: Response): Promise<Response>;
