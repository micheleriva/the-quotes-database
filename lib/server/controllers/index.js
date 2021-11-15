"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuote = exports.getQuotes = void 0;
const model = __importStar(require("../models"));
/**
 * @function getQuotes
 * @description Handles the quotes search
 */
async function getQuotes(req, res) {
    const query = req.query;
    if (!query.text) {
        return res.status(422).json({
            success: false,
            data: "Missing required parameter: text"
        });
    }
    try {
        const result = await model.getQuotes(req.query);
        return res.json({ success: true, data: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: 'Unknown error.' });
    }
}
exports.getQuotes = getQuotes;
/**
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Promise<Response>}
 */
async function addQuote(req, res) {
    const body = req.body;
    if (!body.quote || !body.author)
        return res.status(422).json({
            error: true,
            data: "Missing required parameter(s): 'body' or 'author'"
        });
    try {
        const result = await model.insertNewQuote(body.quote, body.author);
        return res.json({
            success: true,
            data: {
                id: result.body._id,
                author: body.author,
                quote: body.quote
            }
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: 'Unknown error.' });
    }
}
exports.addQuote = addQuote;
