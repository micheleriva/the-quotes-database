import { Request, Response } from 'express'

export type SearchQuery = { text: string, page: number, limit: number }
export type SearchResults<T> = {
  results: number
  values: { id: string, score: number } & T
}
export type SearchResponseBody<T> = {
  success: boolean, data?: SearchResults<T> | string
  error?: string
}
export type SearchRequest<T> = Request<any, SearchResponseBody<T>, null, SearchQuery>
export type SearchResponse<T> = Response<SearchResponseBody<T>>
