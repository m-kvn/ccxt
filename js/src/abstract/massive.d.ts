import { Dict } from '../base/types.js';
import { Exchange as _Exchange } from '../base/Exchange.js';
interface Exchange {
    publicGetV3ReferenceTickers(params?: {}): Promise<Dict>;
    publicGetV3ReferenceTickersTypes(params?: {}): Promise<Dict>;
    publicGetV3ReferenceTickersTicker(params?: {}): Promise<Dict>;
    publicGetV3ReferenceExchanges(params?: {}): Promise<Dict>;
    publicGetV3ReferenceConditions(params?: {}): Promise<Dict>;
    publicGetV1RelatedCompaniesTicker(params?: {}): Promise<Dict>;
    publicGetV1MarketstatusNow(params?: {}): Promise<Dict>;
    publicGetV1MarketstatusUpcoming(params?: {}): Promise<Dict>;
    publicGetV2AggsTickerStocksTickerRangeMultiplierTimespanFromTo(params?: {}): Promise<Dict>;
    publicGetV2AggsTickerStocksTickerPrev(params?: {}): Promise<Dict>;
    publicGetV2AggsGroupedLocaleUsMarketStocksDate(params?: {}): Promise<Dict>;
    publicGetV1OpenCloseStocksTickerDate(params?: {}): Promise<Dict>;
    publicGetV3TradesStocksTicker(params?: {}): Promise<Dict>;
    publicGetV3QuotesStocksTicker(params?: {}): Promise<Dict>;
    publicGetV2LastTradeStocksTicker(params?: {}): Promise<Dict>;
    publicGetV2LastNbboStocksTicker(params?: {}): Promise<Dict>;
    publicGetV2SnapshotLocaleUsMarketsStocksTickers(params?: {}): Promise<Dict>;
    publicGetV2SnapshotLocaleUsMarketsStocksTickersStocksTicker(params?: {}): Promise<Dict>;
    publicGetV2SnapshotLocaleUsMarketsStocksDirection(params?: {}): Promise<Dict>;
    publicGetV3Snapshot(params?: {}): Promise<Dict>;
}
declare abstract class Exchange extends _Exchange {
}
export default Exchange;
