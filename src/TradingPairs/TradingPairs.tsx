import React from 'react';
import useTradingPairs from '../hooks/useTradingPairs';
import './TradingPairs.css';

const TradingPairs = () => {
    const { 
        tradingPairs, 
        handleSelectedTradePairChange,
        selectedTradePair
    } = useTradingPairs();

    return (
        <div>
            <h1>Trading Pair Updates</h1>
                <form className="trade-pair-form">
                    <div>
                        <label htmlFor="product">Select a trading pair:</label>
                        <select onChange={handleSelectedTradePairChange}>
                            {tradingPairs.map((product) => (
                                <option key={product.id} value={product.id}
                                        selected={product.id === selectedTradePair}>
                                    {product.display_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
        </div>
    )
}

export default TradingPairs;