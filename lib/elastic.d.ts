import { Client } from '@elastic/elasticsearch';
export declare const elasticUrl: string;
export declare const esclient: Client;
export declare const index = "quotes";
export declare const type = "quotes";
/**
 * @function createIndex
 * @returns {Promise<void>}
 * @description Creates an index in ElasticSearch.
 */
export declare function createIndex(index: string): Promise<void>;
/**
 * @function setQuotesMapping,
 * @returns {Promise<void>}
 * @description Sets the quotes mapping to the database.
 */
export declare function setQuotesMapping(): Promise<void>;
/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */
export declare function checkConnection(): Promise<boolean>;
