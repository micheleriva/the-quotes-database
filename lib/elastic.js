"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConnection = exports.setQuotesMapping = exports.createIndex = exports.type = exports.index = exports.esclient = exports.elasticUrl = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
require('dotenv').config();
exports.elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200';
exports.esclient = new elasticsearch_1.Client({ node: exports.elasticUrl });
exports.index = 'quotes';
exports.type = 'quotes';
/**
 * @function createIndex
 * @returns {Promise<void>}
 * @description Creates an index in ElasticSearch.
 */
async function createIndex(index) {
    try {
        await exports.esclient.indices.create({ index });
        console.log(`Created index ${index}`);
    }
    catch (err) {
        console.error(`An error occurred while creating the index ${index}:`);
        console.error(err);
    }
}
exports.createIndex = createIndex;
/**
 * @function setQuotesMapping,
 * @returns {Promise<void>}
 * @description Sets the quotes mapping to the database.
 */
async function setQuotesMapping() {
    try {
        const schema = {
            quote: {
                type: "text"
            },
            author: {
                type: "text"
            }
        };
        await exports.esclient.indices.putMapping({
            index: exports.index,
            type: exports.type,
            include_type_name: true,
            body: {
                properties: schema
            }
        });
        console.log('💯 Quotes mapping created successfully');
    }
    catch (err) {
        console.error('An error occurred while setting the quotes mapping:');
        console.error(err);
    }
}
exports.setQuotesMapping = setQuotesMapping;
/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */
function checkConnection() {
    return new Promise(async (resolve) => {
        console.log("Checking connection to ElasticSearch...");
        let isConnected = false;
        while (!isConnected) {
            try {
                await exports.esclient.cluster.health({});
                console.log("Successfully connected to ElasticSearch");
                isConnected = true;
                // eslint-disable-next-line no-empty
            }
            catch (_) {
            }
        }
        resolve(true);
    });
}
exports.checkConnection = checkConnection;
