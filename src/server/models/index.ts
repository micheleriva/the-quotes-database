import { esclient, index, type } from '../../elastic'
import { QuoteData } from '../../models'
import { SearchQuery, SearchResults } from '../../types'

type ElasticHits<T=Record<string, string>> = {
  _id: string
  _score: number
  _source: T
}

export async function getQuotes(req: SearchQuery): Promise<SearchResults<QuoteData>> {

  const query = {
    query: {
      match: {
        quote: {
          query: req.text,
          operator: 'and',
          fuzziness: 'auto'
        }
      }
    }
  }

  const { body: { hits } } = await esclient.search({
    from:  req.page  || 0,
    size:  req.limit || 100,
    index: index,
    type:  type,
    body:  query
  })

  const results = hits.total.value
  const values = hits.hits.map((hit: ElasticHits<QuoteData>) => ({
      id:     hit._id,
      quote:  hit._source.quote,
      author: hit._source.author,
      score:  hit._score
    })
  )
  
  return { results, values }
}

export async function insertNewQuote(quote: string, author: string) {
  return esclient.index({
    index,
    type,
    body: {
      quote,
      author
    }
  })
}
