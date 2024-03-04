import React, { useEffect, useState } from 'react';
import { TickerDataProps } from '../../types/TradingPairTypes';
import { extractTime } from '../utils';
import './TickerTable.css';
import TickerFilters from './Filters/TickerFilters';

interface TickerTableProps {
    tickers: TickerDataProps[]; // Provide the correct prop type
    loading: boolean; // Provide the correct prop type
}

const TickerTable: React.FC<TickerTableProps> = ({ tickers, loading }) => {
    const [side, setSide] = useState<string | null>();
    const [tableRows, setTableRows] = useState<TickerDataProps[]>([]);

    useEffect(() => {
        setTableRows(
            side ? tickers.filter((ticker) => ticker.side === side) : tickers
        );
    }, [tickers]);

    useEffect(() => {
        setTableRows(
            side ? tickers.filter((ticker) => ticker.side === side) : tickers
        );
    }, [side]);

    if (loading) return <div>Loading...</div>;

    if (tickers.length === 0) return null;

    const handleFilterClick = (sideValue: string) => {
        setSide(sideValue === side ? '' : sideValue);
    }

    const sideValues = ['buy', 'sell'];

    return (
        <div className="container">

            <TickerFilters sideValues={sideValues} 
                           side={side}
                           handleFilterClick={handleFilterClick} />

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
                    {tableRows.map((ticker: TickerDataProps) => {
                        const rowClass = tickers[0] ? ticker.side : '';
                        return (
                            <tr key={ticker.trade_id} className={rowClass}>
                                <td>{ticker.trade_id}</td>
                                <td>{ticker.side}</td>
                                <td>{ticker.price}</td>
                                <td>{ticker.size}</td>
                                <td>{extractTime(ticker.time)}</td>
                            </tr>
                        )})         
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TickerTable;
