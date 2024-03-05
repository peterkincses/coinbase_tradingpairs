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

    return (
        <div>
            <div className="page-title">
                <h1>Trading Pair Updates</h1>
            </div>
            
            <TradingPairsForm handleSelectedTradePairChange={handleSelectedTradePairChange}
                              tradingPairs={tradingPairs}
                              selectedTradePair={selectedTradePair}
             />

            <TickerTable tickers={tickers} loading={loading} />

            {news}
        </div>
    )
}

export default TradingPairs;