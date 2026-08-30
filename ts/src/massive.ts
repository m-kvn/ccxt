//  ---------------------------------------------------------------------------

import Exchange from './abstract/massive.js';
import { AuthenticationError, BadRequest, BadSymbol, ExchangeError, NotSupported, PermissionDenied, RateLimitExceeded } from './base/errors.js';
import { TICK_SIZE } from './base/functions/number.js';
import { Precise } from './base/Precise.js';
import type { Dict, Endpoint, Int, Market, NullableDict, OHLCV, OrderBook, Status, Str, Strings, Ticker, Tickers, Trade, int } from './base/types.js';

//  ---------------------------------------------------------------------------

/**
 * @class massive
 * @augments Exchange
 */
export default class massive extends Exchange {
    override describe (): any {
        return this.deepExtend (super.describe (), {
            'id': 'massive',
            'name': 'Massive',
            'countries': [ 'US' ],
            // the free "stocks basic" plan is capped at 5 api calls per minute,
            // every paid plan is unmetered - lower `rateLimit` to 100 on those,
            // e.g. new ccxt.massive ({ 'apiKey': '...', 'rateLimit': 100 })
            'rateLimit': 12000,
            'version': 'v3',
            'certified': false,
            'pro': false,
            'hostname': 'api.massive.com',
            'urls': {
                'logo': 'https://massive.com/brands/logo-massive.jpg',
                'api': {
                    'public': 'https://{hostname}',
                },
                'www': 'https://massive.com',
                'doc': [
                    'https://massive.com/docs/rest/stocks/overview',
                ],
                'fees': 'https://massive.com/pricing',
            },
            'has': {
                'CORS': false,
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'addMargin': false,
                'cancelAllOrders': false,
                'cancelOrder': false,
                'createOrder': false,
                'createStopOrder': false,
                'createTriggerOrder': false,
                'editOrder': false,
                'fetchBalance': false,
                'fetchBidsAsks': false,
                'fetchClosedOrders': false,
                'fetchCurrencies': false,
                'fetchDepositAddress': false,
                'fetchDeposits': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchL1OrderBook': true,
                'fetchL2OrderBook': false,
                'fetchLeverage': false,
                'fetchMarkets': true,
                'fetchMyTrades': false,
                'fetchOHLCV': true,
                'fetchOpenOrders': false,
                'fetchOrder': false,
                'fetchOrderBook': true,
                'fetchOrders': false,
                'fetchPositions': false,
                'fetchStatus': true,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'fetchWithdrawals': false,
                'setLeverage': false,
                'setMarginMode': false,
                'transfer': false,
                'withdraw': false,
                'ws': false,
            },
            'timeframes': {
                '1s': '1/second',
                '5s': '5/second',
                '15s': '15/second',
                '30s': '30/second',
                '1m': '1/minute',
                '2m': '2/minute',
                '3m': '3/minute',
                '5m': '5/minute',
                '10m': '10/minute',
                '15m': '15/minute',
                '30m': '30/minute',
                '1h': '1/hour',
                '2h': '2/hour',
                '3h': '3/hour',
                '4h': '4/hour',
                '6h': '6/hour',
                '8h': '8/hour',
                '12h': '12/hour',
                '1d': '1/day',
                '1w': '1/week',
                '1M': '1/month',
                '3M': '1/quarter',
                '1y': '1/year',
            },
            'api': {
                'public': {
                    'get': {
                        // reference data
                        'v3/reference/tickers': { 'cost': 1 } as Endpoint<Dict>,
                        'v3/reference/tickers/types': { 'cost': 1 } as Endpoint<Dict>,
                        'v3/reference/tickers/{ticker}': { 'cost': 1 } as Endpoint<Dict>,
                        'v3/reference/exchanges': { 'cost': 1 } as Endpoint<Dict>,
                        'v3/reference/conditions': { 'cost': 1 } as Endpoint<Dict>,
                        'v1/related-companies/{ticker}': { 'cost': 1 } as Endpoint<Dict>,
                        // market operations
                        'v1/marketstatus/now': { 'cost': 1 } as Endpoint<Dict>,
                        'v1/marketstatus/upcoming': { 'cost': 1 } as Endpoint<Dict>,
                        // aggregates
                        'v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}': { 'cost': 1 } as Endpoint<Dict>,
                        'v2/aggs/ticker/{stocksTicker}/prev': { 'cost': 1 } as Endpoint<Dict>,
                        'v2/aggs/grouped/locale/us/market/stocks/{date}': { 'cost': 1 } as Endpoint<Dict>,
                        'v1/open-close/{stocksTicker}/{date}': { 'cost': 1 } as Endpoint<Dict>,
                        // trades & quotes
                        'v3/trades/{stocksTicker}': { 'cost': 1 } as Endpoint<Dict>,
                        'v3/quotes/{stocksTicker}': { 'cost': 1 } as Endpoint<Dict>,
                        'v2/last/trade/{stocksTicker}': { 'cost': 1 } as Endpoint<Dict>,
                        'v2/last/nbbo/{stocksTicker}': { 'cost': 1 } as Endpoint<Dict>,
                        // snapshots
                        'v2/snapshot/locale/us/markets/stocks/tickers': { 'cost': 1 } as Endpoint<Dict>,
                        'v2/snapshot/locale/us/markets/stocks/tickers/{stocksTicker}': { 'cost': 1 } as Endpoint<Dict>,
                        'v2/snapshot/locale/us/markets/stocks/{direction}': { 'cost': 1 } as Endpoint<Dict>,
                        'v3/snapshot': { 'cost': 1 } as Endpoint<Dict>,
                    },
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': false,
                    'maker': 0,
                    'taker': 0,
                },
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': false,
            },
            'features': {
                'spot': {
                    'sandbox': false,
                    'fetchOHLCV': {
                        'limit': 50000,
                    },
                },
            },
            'precisionMode': TICK_SIZE,
            'commonCurrencies': {},
            'options': {
                'defaultLimit': 1000,
                'maxOHLCVLimit': 50000,
                'maxTradesLimit': 50000,
                // how much wider than `limit * timeframe` the fetchOHLCV window is opened
                // when no `since` is given, to cover nights, weekends and market holidays
                'ohlcvWindowFactor': 10,
                'fetchMarkets': {
                    'market': 'stocks',
                    'active': true,
                    'limit': 1000,
                    'maxPages': 30,
                },
                'fetchTicker': {
                    // 'snapshot' (default, needs a snapshot entitlement) or 'previousDayBar'
                    'method': 'snapshot',
                },
                'fetchTickers': {
                    // 'snapshot' (default, needs a snapshot entitlement) or 'groupedDailyBars'
                    'method': 'snapshot',
                },
            },
            'exceptions': {
                'exact': {
                    'NOT_AUTHORIZED': PermissionDenied,
                    'NOT_FOUND': BadSymbol,
                    'ERROR': ExchangeError,
                    'Unknown API Key': AuthenticationError,
                },
                'broad': {
                    'not entitled': PermissionDenied,
                    'Unknown API Key': AuthenticationError,
                    'exceeded the maximum requests per minute': RateLimitExceeded,
                    'You have exceeded': RateLimitExceeded,
                    'Ticker not found': BadSymbol,
                    'unknown ticker': BadSymbol,
                    'not supported': NotSupported,
                    'is not a valid': BadRequest,
                },
            },
        });
    }

    /**
     * @ignore
     * @method
     * @name massive#parseRfc3339
     * @description parses an rfc3339 datetime carrying an explicit utc offset, which the base parse8601 does not accept
     * @param {string} datetime an rfc3339 datetime, e.g. 2020-11-10T17:37:37-05:00
     * @returns {int} the unix timestamp in milliseconds
     */
    parseRfc3339 (datetime: Str): Int {
        if (datetime === undefined) {
            return undefined;
        }
        // the trailing 6 characters are the utc offset, e.g. -05:00, on anything
        // shorter or on a 'Z' suffixed datetime the sign check below falls through
        const offsetPart = datetime.slice (-6);
        const sign = offsetPart.slice (0, 1);
        if ((sign !== '+') && (sign !== '-')) {
            return this.parse8601 (datetime);
        }
        const timestamp = this.parse8601 (datetime.slice (0, -6) + 'Z');
        if (timestamp === undefined) {
            return undefined;
        }
        const hours = this.parseToInt (offsetPart.slice (1, 3));
        const minutes = this.parseToInt (offsetPart.slice (4, 6));
        const offset = this.sum (hours * 60, minutes) * 60 * 1000;
        if (sign === '-') {
            return this.sum (timestamp, offset);
        }
        return timestamp - offset;
    }

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
    override async fetchMarkets (params = {}): Promise<Market[]> {
        const options = this.safeDict (this.options, 'fetchMarkets', {});
        const request: Dict = {
            'market': this.safeString (options, 'market', 'stocks'),
            'active': this.safeBool (options, 'active', true),
            'limit': this.safeInteger (options, 'limit', 1000),
        };
        const maxPages = this.safeInteger (options, 'maxPages', 30);
        let result = [];
        for (let i = 0; i < maxPages; i++) {
            const response = await this.publicGetV3ReferenceTickers (this.extend (request, params));
            //
            //     {
            //         "results": [
            //             {
            //                 "ticker": "AAPL",
            //                 "name": "Apple Inc.",
            //                 "market": "stocks",
            //                 "locale": "us",
            //                 "primary_exchange": "XNAS",
            //                 "type": "CS",
            //                 "active": true,
            //                 "currency_name": "usd",
            //                 "cik": "0000320193",
            //                 "composite_figi": "BBG000B9XRY4",
            //                 "share_class_figi": "BBG001S5N8V8",
            //                 "last_updated_utc": "2026-08-29T06:10:48.224862169Z"
            //             }
            //         ],
            //         "status": "OK",
            //         "request_id": "c7fa5b578083aeb23c5542e15efe7b14",
            //         "count": 1,
            //         "next_url": "https://api.massive.com/v3/reference/tickers?cursor=YWN0aXZl"
            //     }
            //
            const results = this.safeList (response, 'results', []);
            const resultsLength = results.length;
            if (resultsLength === 0) {
                break;
            }
            result = this.arrayConcat (result, results);
            const nextUrl = this.safeString (response, 'next_url');
            if (nextUrl === undefined) {
                break;
            }
            const parts = nextUrl.split ('cursor=');
            const partsLength = parts.length;
            if (partsLength < 2) {
                break;
            }
            request['cursor'] = parts[1];
        }
        return this.parseMarkets (result);
    }

    override parseMarket (market: Dict): Market {
        const id = this.safeString (market, 'ticker');
        // a stock ticker is not a currency code, it must not go through
        // safeCurrencyCode - tickers such as LINK, COMP or UNI would be rewritten
        const base = id;
        const quoteId = this.safeString (market, 'currency_name', 'usd');
        const quote = quoteId.toUpperCase ();
        const symbol = base + '/' + quote;
        return this.safeMarketStructure ({
            'id': id,
            'symbol': symbol,
            'base': base,
            'quote': quote,
            'baseId': id,
            'quoteId': quoteId,
            'settle': undefined,
            'settleId': undefined,
            'type': 'spot',
            'spot': true,
            'stock': true,
            'margin': false,
            'swap': false,
            'future': false,
            'option': false,
            'active': this.safeBool (market, 'active'),
            'contract': false,
            'linear': undefined,
            'inverse': undefined,
            'taker': 0,
            'maker': 0,
            'contractSize': undefined,
            'expiry': undefined,
            'expiryDatetime': undefined,
            'strike': undefined,
            'optionType': undefined,
            'precision': {
                'amount': this.parseNumber ('1'),
                'price': this.parseNumber ('0.0001'),
            },
            'limits': {
                'leverage': {
                    'min': undefined,
                    'max': undefined,
                },
                'amount': {
                    'min': undefined,
                    'max': undefined,
                },
                'price': {
                    'min': undefined,
                    'max': undefined,
                },
                'cost': {
                    'min': undefined,
                    'max': undefined,
                },
            },
            'created': this.parse8601 (this.safeString (market, 'list_date')),
            'info': market,
        });
    }

    /**
     * @method
     * @name massive#fetchStatus
     * @description the latest known information on the availability of the us equity market
     * @see https://massive.com/docs/rest/stocks/market-operations/market-status
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [status structure](https://docs.ccxt.com/#/?id=exchange-status-structure), the raw session state stays under `info`, e.g. `info.market` is one of open, closed, extended-hours
     */
    override async fetchStatus (params = {}): Promise<Status> {
        const response = await this.publicGetV1MarketstatusNow (params);
        //
        //     {
        //         "afterHours": false,
        //         "currencies": { "crypto": "open", "fx": "closed" },
        //         "earlyHours": false,
        //         "exchanges": { "nasdaq": "closed", "nyse": "closed", "otc": "closed" },
        //         "market": "closed",
        //         "serverTime": "2026-08-29T22:03:43-04:00"
        //     }
        //
        const updated = this.parseRfc3339 (this.safeString (response, 'serverTime'));
        return {
            'status': 'ok',
            'updated': updated,
            'eta': undefined,
            'url': undefined,
            'info': response,
        };
    }

    /**
     * @method
     * @name massive#fetchTime
     * @description fetches the current integer timestamp in milliseconds from the exchange server
     * @see https://massive.com/docs/rest/stocks/market-operations/market-status
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int} the current integer timestamp in milliseconds from the exchange server
     */
    override async fetchTime (params = {}): Promise<Int> {
        const response = await this.publicGetV1MarketstatusNow (params);
        return this.parseRfc3339 (this.safeString (response, 'serverTime'));
    }

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
    override async fetchTicker (symbol: string, params = {}): Promise<Ticker> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {
            'stocksTicker': market['id'],
        };
        let method = undefined;
        [ method, params ] = this.handleOptionAndParams (params, 'fetchTicker', 'method', 'snapshot');
        if (method === 'previousDayBar') {
            const previous = await this.publicGetV2AggsTickerStocksTickerPrev (this.extend (request, params));
            //
            //     {
            //         "ticker": "AAPL",
            //         "queryCount": 1,
            //         "resultsCount": 1,
            //         "adjusted": true,
            //         "results": [
            //             {
            //                 "T": "AAPL",
            //                 "v": 38649398,
            //                 "vw": 319.5134,
            //                 "o": 316.845,
            //                 "c": 319.7,
            //                 "h": 322.37,
            //                 "l": 315.4504,
            //                 "t": 1787947200000,
            //                 "n": 760062
            //             }
            //         ],
            //         "status": "OK"
            //     }
            //
            const previousResults = this.safeList (previous, 'results', []);
            return this.parseTicker (this.safeDict (previousResults, 0, {}), market);
        }
        const response = await this.publicGetV2SnapshotLocaleUsMarketsStocksTickersStocksTicker (this.extend (request, params));
        //
        //     {
        //         "request_id": "657e430f1ae768891f018e08e03598d8",
        //         "status": "OK",
        //         "ticker": {
        //             "ticker": "AAPL",
        //             "day": { "o": 119.62, "h": 120.53, "l": 118.81, "c": 120.4229, "v": 28727868, "vw": 119.725 },
        //             "lastQuote": { "P": 120.47, "S": 4, "p": 120.46, "s": 8, "t": 1605195918507251700 },
        //             "lastTrade": { "c": [ 14, 41 ], "i": "4046", "p": 120.47, "s": 236, "t": 1605195918306274000, "x": 10 },
        //             "min": { "av": 28724441, "c": 120.4201, "h": 120.468, "l": 120.37, "n": 762, "o": 120.435, "t": 1684428720000, "v": 270796, "vw": 120.4129 },
        //             "prevDay": { "o": 117.19, "h": 119.63, "l": 116.44, "c": 119.49, "v": 110597265, "vw": 118.4998 },
        //             "todaysChange": 0.98,
        //             "todaysChangePerc": 0.82,
        //             "updated": 1605195918306274000
        //         }
        //     }
        //
        return this.parseTicker (this.safeDict (response, 'ticker', {}), market);
    }

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
    override async fetchTickers (symbols: Strings = undefined, params = {}): Promise<Tickers> {
        await this.loadMarkets ();
        symbols = this.marketSymbols (symbols);
        let method = undefined;
        [ method, params ] = this.handleOptionAndParams (params, 'fetchTickers', 'method', 'snapshot');
        if (method === 'groupedDailyBars') {
            const groupedRequest: Dict = {
                'date': this.safeString (params, 'date', this.yyyymmdd (this.milliseconds ())),
            };
            params = this.omit (params, [ 'date' ]);
            const grouped = await this.publicGetV2AggsGroupedLocaleUsMarketStocksDate (this.extend (groupedRequest, params));
            //
            //     {
            //         "queryCount": 12518,
            //         "resultsCount": 12518,
            //         "adjusted": true,
            //         "results": [
            //             { "T": "GBCI", "v": 898130, "vw": 46.9919, "o": 47.5, "c": 46.88, "h": 47.71, "l": 46.85, "t": 1787947200000, "n": 16823 }
            //         ],
            //         "status": "OK"
            //     }
            //
            const groupedResults = this.safeList (grouped, 'results', []);
            return this.parseTickers (groupedResults, symbols);
        }
        const request: Dict = {};
        if (symbols !== undefined) {
            const ids = this.marketIds (symbols);
            request['tickers'] = ids.join (',');
        }
        const response = await this.publicGetV2SnapshotLocaleUsMarketsStocksTickers (this.extend (request, params));
        //
        //     {
        //         "count": 1,
        //         "status": "OK",
        //         "tickers": [
        //             {
        //                 "ticker": "BCAT",
        //                 "day": { "o": 20.64, "h": 20.64, "l": 20.506, "c": 20.506, "v": 37216, "vw": 20.616 },
        //                 "prevDay": { "o": 20.79, "h": 21, "l": 20.5, "c": 20.63, "v": 292738, "vw": 20.6939 },
        //                 "lastQuote": { "p": 20.5, "s": 13, "P": 20.6, "S": 22, "t": 1605192959994246100 },
        //                 "lastTrade": { "p": 20.506, "s": 2416, "x": 4, "t": 1605192894630916600, "i": "71675577320245" },
        //                 "todaysChange": -0.124,
        //                 "todaysChangePerc": -0.601,
        //                 "updated": 1605192894630916600
        //             }
        //         ]
        //     }
        //
        const tickers = this.safeList (response, 'tickers', []);
        return this.parseTickers (tickers, symbols);
    }

    override parseTicker (ticker: Dict, market: Market = undefined): Ticker {
        const day = this.safeDict (ticker, 'day');
        if (day === undefined) {
            // aggregate bar shape, returned by the previous day bar and the daily market summary endpoints
            const barMarketId = this.safeString (ticker, 'T');
            const barTimestamp = this.safeInteger (ticker, 't');
            const barClose = this.safeString (ticker, 'c');
            return this.safeTicker ({
                'symbol': this.safeSymbol (barMarketId, market),
                'timestamp': barTimestamp,
                'datetime': this.iso8601 (barTimestamp),
                'high': this.safeString (ticker, 'h'),
                'low': this.safeString (ticker, 'l'),
                'bid': undefined,
                'bidVolume': undefined,
                'ask': undefined,
                'askVolume': undefined,
                'vwap': this.safeString (ticker, 'vw'),
                'open': this.safeString (ticker, 'o'),
                'close': barClose,
                'last': barClose,
                'previousClose': undefined,
                'change': undefined,
                'percentage': undefined,
                'average': undefined,
                'baseVolume': this.safeString (ticker, 'v'),
                'quoteVolume': undefined,
                'info': ticker,
            }, market);
        }
        // snapshot shape
        const marketId = this.safeString (ticker, 'ticker');
        const lastQuote = this.safeDict (ticker, 'lastQuote', {});
        const lastTrade = this.safeDict (ticker, 'lastTrade', {});
        const previousDay = this.safeDict (ticker, 'prevDay', {});
        const timestamp = this.safeIntegerProduct (ticker, 'updated', 0.000001);
        const last = this.safeString (lastTrade, 'p');
        return this.safeTicker ({
            'symbol': this.safeSymbol (marketId, market),
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeString (day, 'h'),
            'low': this.safeString (day, 'l'),
            'bid': this.safeString (lastQuote, 'p'),
            'bidVolume': this.safeString (lastQuote, 's'),
            'ask': this.safeString (lastQuote, 'P'),
            'askVolume': this.safeString (lastQuote, 'S'),
            'vwap': this.safeString (day, 'vw'),
            'open': this.safeString (day, 'o'),
            'close': this.safeString (day, 'c'),
            'last': last,
            'previousClose': this.safeString (previousDay, 'c'),
            'change': this.safeString (ticker, 'todaysChange'),
            'percentage': this.safeString (ticker, 'todaysChangePerc'),
            'average': undefined,
            'baseVolume': this.safeString (day, 'v'),
            'quoteVolume': undefined,
            'info': ticker,
        }, market);
    }

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
    override async fetchOHLCV (symbol: string, timeframe = '1d', since: Int = undefined, limit: Int = undefined, params = {}): Promise<OHLCV[]> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const selectedTimeframe = this.safeString (this.timeframes, timeframe, timeframe);
        const parts = selectedTimeframe.split ('/');
        const partsLength = parts.length;
        if (partsLength < 2) {
            throw new BadRequest (this.id + ' fetchOHLCV() does not support the ' + timeframe + ' timeframe');
        }
        const maxLimit = this.safeInteger (this.options, 'maxOHLCVLimit', 50000);
        if (limit === undefined) {
            limit = this.safeInteger (this.options, 'defaultLimit', 1000);
        }
        limit = Math.min (limit, maxLimit);
        let until = this.safeInteger (params, 'until');
        params = this.omit (params, [ 'until' ]);
        const now = this.milliseconds ();
        const duration = this.parseTimeframe (timeframe) * 1000;
        let sort = 'asc';
        if (since === undefined) {
            // ask for the most recent candles instead of the oldest ones inside the window.
            // us equities trade ~6.5 hours a day, 5 days a week, so a window `limit` candles
            // wide in wall clock time always comes back short - widen it and let the exchange
            // cut it down to `limit`, parseOHLCVs sorts the result back into ascending order
            sort = 'desc';
            if (until === undefined) {
                until = now;
            }
            const windowFactor = this.safeInteger (this.options, 'ohlcvWindowFactor', 10);
            since = until - (limit * duration * windowFactor);
            if (since < 0) {
                since = 0;
            }
        } else if (until === undefined) {
            const computedUntil = this.sum (since, limit * duration);
            if (computedUntil > now) {
                until = now;
            } else {
                until = computedUntil;
            }
        }
        // massive counts `limit` in base aggregates - seconds for the second timespan,
        // minutes for minute and hour, days for day and everything above it - and not in
        // returned candles, so a weekly request for 3 candles comes back with a single one
        const timespan = parts[1];
        let baseDuration = 24 * 60 * 60 * 1000;
        if (timespan === 'second') {
            baseDuration = 1000;
        } else if ((timespan === 'minute') || (timespan === 'hour')) {
            baseDuration = 60 * 1000;
        }
        let requestLimit = this.parseToInt (limit * duration / baseDuration);
        requestLimit = Math.min (requestLimit, maxLimit);
        const request: Dict = {
            'stocksTicker': market['id'],
            'multiplier': parts[0],
            'timespan': parts[1],
            'from': since,
            'to': until,
            'limit': requestLimit,
            'sort': sort,
            'adjusted': true,
        };
        const response = await this.publicGetV2AggsTickerStocksTickerRangeMultiplierTimespanFromTo (this.extend (request, params));
        //
        //     {
        //         "ticker": "AAPL",
        //         "queryCount": 3,
        //         "resultsCount": 3,
        //         "adjusted": true,
        //         "results": [
        //             { "v": 75051951, "vw": 305.1311, "o": 309.58, "c": 303.42, "h": 311.8, "l": 302.56, "t": 1785729600000, "n": 1388685 }
        //         ],
        //         "status": "OK"
        //     }
        //
        const results = this.safeList (response, 'results', []);
        // when no `since` was given the newest candles are the interesting ones, so trim
        // the over-fetched tail-end of the window from the front instead of from the back
        const tail = (sort === 'desc');
        return this.parseOHLCVs (results, market, timeframe, since, limit, tail);
    }

    override parseOHLCV (ohlcv: any, market: Market = undefined): OHLCV {
        return [
            this.safeInteger (ohlcv, 't'),
            this.safeNumber (ohlcv, 'o'),
            this.safeNumber (ohlcv, 'h'),
            this.safeNumber (ohlcv, 'l'),
            this.safeNumber (ohlcv, 'c'),
            this.safeNumber (ohlcv, 'v'),
        ];
    }

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
    override async fetchTrades (symbol: string, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {
            'stocksTicker': market['id'],
            'sort': 'timestamp',
            'order': 'desc',
        };
        if (limit !== undefined) {
            const maxLimit = this.safeInteger (this.options, 'maxTradesLimit', 50000);
            request['limit'] = Math.min (limit, maxLimit);
        }
        if (since !== undefined) {
            // the api works in nanoseconds, which overflows a double, keep it a string
            request['timestamp.gte'] = Precise.stringMul (this.numberToString (since), '1000000');
            request['order'] = 'asc';
        }
        const until = this.safeInteger (params, 'until');
        params = this.omit (params, [ 'until' ]);
        if (until !== undefined) {
            request['timestamp.lte'] = Precise.stringMul (this.numberToString (until), '1000000');
        }
        const response = await this.publicGetV3TradesStocksTicker (this.extend (request, params));
        //
        //     {
        //         "request_id": "a47d1beb8c11b6ae897ab76cdbbf35a3",
        //         "status": "OK",
        //         "results": [
        //             {
        //                 "id": "1",
        //                 "exchange": 11,
        //                 "tape": 3,
        //                 "price": 171.55,
        //                 "size": 100,
        //                 "conditions": [ 12, 41 ],
        //                 "correction": 0,
        //                 "sequence_number": 1063,
        //                 "participant_timestamp": 1517562000015577000,
        //                 "sip_timestamp": 1517562000016036600
        //             }
        //         ]
        //     }
        //
        const results = this.safeList (response, 'results', []);
        return this.parseTrades (results, market, since, limit);
    }

    override parseTrade (trade: Dict, market: Market = undefined): Trade {
        const marketId = this.safeString (trade, 'T');
        const resolved = this.safeMarket (marketId, market);
        const timestamp = this.safeIntegerProduct2 (trade, 'sip_timestamp', 'participant_timestamp', 0.000001);
        return this.safeTrade ({
            'id': this.safeString2 (trade, 'id', 'i'),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': resolved['symbol'],
            'order': undefined,
            'type': undefined,
            // the consolidated tape does not disclose the aggressor of a trade
            'side': undefined,
            'takerOrMaker': undefined,
            'price': this.safeString2 (trade, 'price', 'p'),
            'amount': this.safeString2 (trade, 'size', 's'),
            'cost': undefined,
            'fee': undefined,
        }, resolved);
    }

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
    override async fetchOrderBook (symbol: string, limit: Int = undefined, params = {}): Promise<OrderBook> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {
            'stocksTicker': market['id'],
        };
        const response = await this.publicGetV2LastNbboStocksTicker (this.extend (request, params));
        //
        //     {
        //         "request_id": "b84e24636301f19f88e0dfbf9a45ed5c",
        //         "status": "OK",
        //         "results": {
        //             "P": 127.98,
        //             "S": 7,
        //             "T": "AAPL",
        //             "X": 19,
        //             "p": 127.96,
        //             "q": 83480742,
        //             "s": 1,
        //             "t": 1617827221349730300,
        //             "x": 11,
        //             "y": 1617827221349366000,
        //             "z": 3
        //         }
        //     }
        //
        const result = this.safeDict (response, 'results', {});
        const timestamp = this.safeIntegerProduct (result, 't', 0.000001);
        const bids = [];
        const asks = [];
        const bidPrice = this.safeString (result, 'p');
        const bidAmount = this.safeString (result, 's');
        if ((bidPrice !== undefined) && Precise.stringGt (bidPrice, '0')) {
            bids.push ([ bidPrice, bidAmount ]);
        }
        const askPrice = this.safeString (result, 'P');
        const askAmount = this.safeString (result, 'S');
        if ((askPrice !== undefined) && Precise.stringGt (askPrice, '0')) {
            asks.push ([ askPrice, askAmount ]);
        }
        const rawOrderBook: Dict = {
            'bids': bids,
            'asks': asks,
        };
        const orderbook = this.parseOrderBook (rawOrderBook, market['symbol'], timestamp);
        orderbook['nonce'] = this.safeInteger (result, 'q');
        return orderbook;
    }

    override sign (path: any, api: any = 'public', method = 'GET', params = {}, headers: NullableDict = undefined, body: Str = undefined) {
        // every massive endpoint is authenticated, the api key entitles the
        // caller to a data feed, it is not bound to a trading account
        this.checkRequiredCredentials ();
        const request = '/' + this.implodeParams (path, params);
        let url = this.implodeHostname (this.urls['api']['public']) + request;
        const query = this.omit (params, this.extractParams (path));
        const queryLength = Object.keys (query).length;
        if (queryLength > 0) {
            url += '?' + this.urlencode (query);
        }
        headers = {
            'Authorization': 'Bearer ' + this.apiKey,
            'Accept': 'application/json',
        };
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    override handleErrors (code: int, reason: string, url: string, method: string, headers: Dict, body: string, response: any, requestHeaders: any, requestBody: any) {
        if (response === undefined) {
            return undefined; // fallback to the default error handler
        }
        const status = this.safeString (response, 'status');
        // DELAYED is a successful response on the delayed data plans
        if ((status === 'OK') || (status === 'DELAYED')) {
            return undefined;
        }
        const error = this.safeString2 (response, 'error', 'message');
        if ((status === undefined) && (error === undefined)) {
            return undefined;
        }
        //
        //     { "status": "NOT_AUTHORIZED", "request_id": "943c", "message": "You are not entitled to this data." }
        //     { "status": "ERROR", "request_id": "943c", "error": "Unknown API Key" }
        //
        const feedback = this.id + ' ' + body;
        this.throwExactlyMatchedException (this.exceptions['exact'], error, feedback);
        this.throwBroadlyMatchedException (this.exceptions['broad'], error, feedback);
        this.throwExactlyMatchedException (this.exceptions['exact'], status, feedback);
        throw new ExchangeError (feedback);
    }
}
