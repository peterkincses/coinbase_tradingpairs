import React, { useEffect } from 'react';
import { TickerDataProps } from '../../types/TradingPairTypes';
import { extractTime } from '../utils';
import './TickerTable.css';

interface TickerTableProps {
    tickers: TickerDataProps[]; // Provide the correct prop type
    loading: boolean; // Provide the correct prop type
}

const TickerTable: React.FC<TickerTableProps> = ({ tickers, loading }) => {
    if (loading) return <div>Loading...</div>;

    if (tickers.length === 0) return null;

    console.log(tickers);

    return (
        <div className="container">
            <table style={{ width: "100%" }} className="tickerTable">
                <thead>
                    <tr>
                        <th>Trade Id</th>
                        <th>Side</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {tickers.map((ticker: TickerDataProps) => (
                        <tr key={ticker.trade_id}>
                            <td>{ticker.trade_id}</td>
                            <td>{ticker.side}</td>
                            {/* <td>{currency.symbol + ticker.price}</td> */}
                            <td>{ticker.price}</td>
                            <td>{ticker.size}</td>
                            <td>{extractTime(ticker.time)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TickerTable;
