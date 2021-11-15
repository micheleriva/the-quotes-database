import { Client } from '@elastic/elasticsearch'
require('dotenv').config()

export const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200'
export const esclient   = new Client({ node: elasticUrl })
export const index      = 'quotes'
export const type       = 'quotes'

/**
 * @function createIndex
 * @returns {Promise<void>}
 * @description Creates an index in ElasticSearch.
 */

export async function createIndex(index: string): Promise<void> {
  try {

    await esclient.indices.create({ index })
    console.log(`Created index ${index}`)

  } catch (err) {

    console.error(`An error occurred while creating the index ${index}:`)
    console.error(err);

  }
}

/**
 * @function setQuotesMapping,
 * @returns {Promise<void>}
 * @description Sets the quotes mapping to the database.
 */

export async function setQuotesMapping (): Promise<void> {
  try {
    const schema = {
      quote: {
        type: "text" 
      },
      author: {
        type: "text"
      }
    };
  
    await esclient.indices.putMapping({ 
      index, 
      type,
      include_type_name: true,
      body: { 
        properties: schema 
      } 
    })
    console.log('💯 Quotes mapping created successfully')
  
  } catch (err) {
    console.error('An error occurred while setting the quotes mapping:')
    console.error(err);
  }
}

/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */

export function checkConnection(): Promise<boolean> {
  return new Promise(async (resolve) => {

    console.log("Checking connection to ElasticSearch...");
    let isConnected = false;

    while (!isConnected) {
      try {

        await esclient.cluster.health({});
        console.log("Successfully connected to ElasticSearch");
        isConnected = true;

      // eslint-disable-next-line no-empty
      } catch (_) {

      }
    }

    resolve(true);

  });
}
