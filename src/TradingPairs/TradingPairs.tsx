// import React from 'react';
import useTradingPairs from '../hooks/useTradingPairs';
import './TradingPairs.css';
import TickerTable from './TickerTable';
import TradingPairsForm from './Form/TradingPairsForm';

const TradingPairs = () => {
    const { 
        tradingPairs, 
        handleSelectedTradePairChange,
        selectedTradePair,
        tickers,
        loading
    } = useTradingPairs();

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
        </div>
    )
}

export default TradingPairs;