from ccxt.base.types import Entry
_Dict = dict[str, object]


class ImplicitAPI:
    public_get_v3_reference_tickers = publicGetV3ReferenceTickers = Entry[_Dict]('v3/reference/tickers', 'public', 'GET', {'cost': 1})
    public_get_v3_reference_tickers_types = publicGetV3ReferenceTickersTypes = Entry[_Dict]('v3/reference/tickers/types', 'public', 'GET', {'cost': 1})
    public_get_v3_reference_tickers_ticker = publicGetV3ReferenceTickersTicker = Entry[_Dict]('v3/reference/tickers/{ticker}', 'public', 'GET', {'cost': 1})
    public_get_v3_reference_exchanges = publicGetV3ReferenceExchanges = Entry[_Dict]('v3/reference/exchanges', 'public', 'GET', {'cost': 1})
    public_get_v3_reference_conditions = publicGetV3ReferenceConditions = Entry[_Dict]('v3/reference/conditions', 'public', 'GET', {'cost': 1})
    public_get_v1_related_companies_ticker = publicGetV1RelatedCompaniesTicker = Entry[_Dict]('v1/related-companies/{ticker}', 'public', 'GET', {'cost': 1})
    public_get_v1_marketstatus_now = publicGetV1MarketstatusNow = Entry[_Dict]('v1/marketstatus/now', 'public', 'GET', {'cost': 1})
    public_get_v1_marketstatus_upcoming = publicGetV1MarketstatusUpcoming = Entry[_Dict]('v1/marketstatus/upcoming', 'public', 'GET', {'cost': 1})
    public_get_v2_aggs_ticker_stocksticker_range_multiplier_timespan_from_to = publicGetV2AggsTickerStocksTickerRangeMultiplierTimespanFromTo = Entry[_Dict]('v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}', 'public', 'GET', {'cost': 1})
    public_get_v2_aggs_ticker_stocksticker_prev = publicGetV2AggsTickerStocksTickerPrev = Entry[_Dict]('v2/aggs/ticker/{stocksTicker}/prev', 'public', 'GET', {'cost': 1})
    public_get_v2_aggs_grouped_locale_us_market_stocks_date = publicGetV2AggsGroupedLocaleUsMarketStocksDate = Entry[_Dict]('v2/aggs/grouped/locale/us/market/stocks/{date}', 'public', 'GET', {'cost': 1})
    public_get_v1_open_close_stocksticker_date = publicGetV1OpenCloseStocksTickerDate = Entry[_Dict]('v1/open-close/{stocksTicker}/{date}', 'public', 'GET', {'cost': 1})
    public_get_v3_trades_stocksticker = publicGetV3TradesStocksTicker = Entry[_Dict]('v3/trades/{stocksTicker}', 'public', 'GET', {'cost': 1})
    public_get_v3_quotes_stocksticker = publicGetV3QuotesStocksTicker = Entry[_Dict]('v3/quotes/{stocksTicker}', 'public', 'GET', {'cost': 1})
    public_get_v2_last_trade_stocksticker = publicGetV2LastTradeStocksTicker = Entry[_Dict]('v2/last/trade/{stocksTicker}', 'public', 'GET', {'cost': 1})
    public_get_v2_last_nbbo_stocksticker = publicGetV2LastNbboStocksTicker = Entry[_Dict]('v2/last/nbbo/{stocksTicker}', 'public', 'GET', {'cost': 1})
    public_get_v2_snapshot_locale_us_markets_stocks_tickers = publicGetV2SnapshotLocaleUsMarketsStocksTickers = Entry[_Dict]('v2/snapshot/locale/us/markets/stocks/tickers', 'public', 'GET', {'cost': 1})
    public_get_v2_snapshot_locale_us_markets_stocks_tickers_stocksticker = publicGetV2SnapshotLocaleUsMarketsStocksTickersStocksTicker = Entry[_Dict]('v2/snapshot/locale/us/markets/stocks/tickers/{stocksTicker}', 'public', 'GET', {'cost': 1})
    public_get_v2_snapshot_locale_us_markets_stocks_direction = publicGetV2SnapshotLocaleUsMarketsStocksDirection = Entry[_Dict]('v2/snapshot/locale/us/markets/stocks/{direction}', 'public', 'GET', {'cost': 1})
    public_get_v3_snapshot = publicGetV3Snapshot = Entry[_Dict]('v3/snapshot', 'public', 'GET', {'cost': 1})
