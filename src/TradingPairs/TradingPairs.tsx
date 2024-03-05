import {lazy} from 'react';
import useTradingPairs from '../hooks/useTradingPairs';
import './TradingPairs.css';
import TickerTable from './TickerTable';
import TradingPairsForm from './Form/TradingPairsForm';
import { useMemo } from 'react';
import { TradingPairProps } from '../types/TradingPairTypes';

const TickerNews = lazy(() => import("./News"));

const TradingPairs = () => {
    const { 
        tradingPairs, 
        handleSelectedTradePairChange,
        selectedTradePair,
        tickers,
        loading
    } = useTradingPairs();

    const assetCode = tradingPairs.find(
          (pair: TradingPairProps) => pair.id === selectedTradePair)?.base_currency;

    const news = useMemo(() => {
        if (typeof assetCode === 'undefined') return null;
        return <TickerNews assetCode={assetCode} />
    }, [assetCode]);

    const form = useMemo(() => {
        if (tradingPairs.length === 0) return null;
        return <TradingPairsForm 
                        handleSelectedTradePairChange={handleSelectedTradePairChange}
                        tradingPairs={tradingPairs}
                        selectedTradePair={selectedTradePair}
        />
    }, [selectedTradePair, tradingPairs]);

    const table = useMemo(() => {
        if (tickers.length === 0) return null;
        return <TickerTable tickers={tickers} loading={loading} />
    }, [tickers, loading]);

    return (
        <div>
            <div className="page-title">
                <h1>Trading Pair Updates</h1>
            </div>
            
            {form}
            {table}
            {news}
        </div>
    )
}

export default TradingPairs;