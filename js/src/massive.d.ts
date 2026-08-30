import Exchange from './abstract/massive.js';
import type { Dict, Int, Market, NullableDict, OHLCV, OrderBook, Status, Str, Strings, Ticker, Tickers, Trade, int } from './base/types.js';
/**
 * @class massive
 * @augments Exchange
 */
export default class massive extends Exchange {
    describe(): any;
    /**
     * @ignore
     * @method
     * @name massive#parseRfc3339
     * @description parses an rfc3339 datetime carrying an explicit utc offset, which the base parse8601 does not accept
     * @param {string} datetime an rfc3339 datetime, e.g. 2020-11-10T17:37:37-05:00
     * @returns {int} the unix timestamp in milliseconds
     */
    parseRfc3339(datetime: Str): Int;
    /**
     * @method
     * @name massive#fetchMarkets
     * @description retrieves data on all us stock tickers covered by massive
     * @see https://massive.com/docs/rest/stocks/tickers/all-tickers
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.market] the asset class to load, defaults to 'stocks'
     * @param {boolean} [params.active] whether to load only actively traded tickers, defaults to true
     * @param {string} [params.date] load the ticker universe as it stood on this date, e.g. 2026-08-28
     * @returns {object[]} an array of objects representing market data
     */
    fetchMarkets(params?: {}): Promise<Market[]>;
    parseMarket(market: Dict): Market;
    /**
     * @method
     * @name massive#fetchStatus
     * @description the latest known information on the availability of the us equity market
     * @see https://massive.com/docs/rest/stocks/market-operations/market-status
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [status structure](https://docs.ccxt.com/#/?id=exchange-status-structure), the raw session state stays under `info`, e.g. `info.market` is one of open, closed, extended-hours
     */
    fetchStatus(params?: {}): Promise<Status>;
    /**
     * @method
     * @name massive#fetchTime
     * @description fetches the current integer timestamp in milliseconds from the exchange server
     * @see https://massive.com/docs/rest/stocks/market-operations/market-status
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int} the current integer timestamp in milliseconds from the exchange server
     */
    fetchTime(params?: {}): Promise<Int>;
    /**
     * @method
     * @name massive#fetchTicker
     * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a particular market
     * @see https://massive.com/docs/rest/stocks/snapshots/single-ticker-snapshot
     * @see https://massive.com/docs/rest/stocks/aggregates/previous-day-bar
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.method] 'snapshot' (default) or 'previousDayBar', snapshots need a snapshot entitlement on the massive plan
     * @returns {object} a [ticker structure](https://docs.ccxt.com/#/?id=ticker-structure)
     */
    fetchTicker(symbol: string, params?: {}): Promise<Ticker>;
    /**
     * @method
     * @name massive#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @see https://massive.com/docs/rest/stocks/snapshots/full-market-snapshot
     * @see https://massive.com/docs/rest/stocks/aggregates/daily-market-summary
     * @param {string[]} [symbols] unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.method] 'snapshot' (default) or 'groupedDailyBars', snapshots need a snapshot entitlement on the massive plan
     * @param {string} [params.date] only read by 'groupedDailyBars', the trading day to summarise, e.g. 2026-08-28, defaults to today
     * @returns {object} a dictionary of [ticker structures](https://docs.ccxt.com/#/?id=ticker-structure)
     */
    fetchTickers(symbols?: Strings, params?: {}): Promise<Tickers>;
    parseTicker(ticker: Dict, market?: Market): Ticker;
    /**
     * @method
     * @name massive#fetchOHLCV
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @see https://massive.com/docs/rest/stocks/aggregates/custom-bars
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch, max 50000
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms of the latest candle to fetch
     * @param {boolean} [params.adjusted] whether the bars are adjusted for splits, defaults to true
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OHLCV[]>;
    parseOHLCV(ohlcv: any, market?: Market): OHLCV;
    /**
     * @method
     * @name massive#fetchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://massive.com/docs/rest/stocks/trades-quotes/trades
     * @param {string} symbol unified symbol of the market to fetch trades for
     * @param {int} [since] timestamp in ms of the earliest trade to fetch
     * @param {int} [limit] the maximum amount of trades to fetch, max 50000
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms of the latest trade to fetch
     * @returns {object[]} a list of [trade structures](https://docs.ccxt.com/#/?id=public-trades)
     */
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    parseTrade(trade: Dict, market?: Market): Trade;
    /**
     * @method
     * @name massive#fetchOrderBook
     * @description fetches the top of the consolidated order book, massive publishes the national best bid and offer, not the full depth of book
     * @see https://massive.com/docs/rest/stocks/trades-quotes/last-quote
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] not used by massive.fetchOrderBook, the nbbo carries a single level per side
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures](https://docs.ccxt.com/#/?id=order-book-structure) indexed by market symbols
     */
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<OrderBook>;
    sign(path: any, api?: any, method?: string, params?: {}, headers?: NullableDict, body?: Str): {
        url: string;
        method: string;
        body: Str;
        headers: Dict;
    };
    handleErrors(code: int, reason: string, url: string, method: string, headers: Dict, body: string, response: any, requestHeaders: any, requestBody: any): undefined;
}
