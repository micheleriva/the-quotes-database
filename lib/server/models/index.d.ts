import { QuoteData } from '../../models';
import { SearchQuery, SearchResults } from '../../types';
export declare function getQuotes(req: SearchQuery): Promise<SearchResults<QuoteData>>;
export declare function insertNewQuote(quote: string, author: string): Promise<import("@elastic/elasticsearch").ApiResponse<Record<string, any>, unknown>>;
