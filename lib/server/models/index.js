"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNewQuote = exports.getQuotes = void 0;
const elastic_1 = require("../../elastic");
async function getQuotes(req) {
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
    };
    const { body: { hits } } = await elastic_1.esclient.search({
        from: req.page || 0,
        size: req.limit || 100,
        index: elastic_1.index,
        type: elastic_1.type,
        body: query
    });
    const results = hits.total.value;
    const values = hits.hits.map((hit) => ({
        id: hit._id,
        quote: hit._source.quote,
        author: hit._source.author,
        score: hit._score
    }));
    return { results, values };
}
exports.getQuotes = getQuotes;
async function insertNewQuote(quote, author) {
    return elastic_1.esclient.index({
        index: elastic_1.index,
        type: elastic_1.type,
        body: {
            quote,
            author
        }
    });
}
exports.insertNewQuote = insertNewQuote;
