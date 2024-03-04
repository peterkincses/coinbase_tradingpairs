import React, {useState, useEffect} from 'react';
import {
    TRADING_PAIRS_API,
    TICKERS_SOCKET_URL,
    DEFAULT_TRADING_PAIR
} from '../constants';
import { TradingPairProps, lastJsonMessageProps } from '../types/TradingPairTypes';


const useTradingPairs = () => {

    const [tradingPairs, setTradingPairs] = useState<TradingPairProps[]>([]);
    const [selectedTradePair, setSelectedTradePair] = useState<string>(DEFAULT_TRADING_PAIR);
    const [tickers, setTickers] = useState([]);
    const [messageHistory, setMessageHistory] = useState([]);

    useEffect(() => {
        const apiCall = async () => {
            const pairs = await fetch(TRADING_PAIRS_API + "/products")
            .then((res) => res.json())
            .then((data) => data as TradingPairProps[])
            .catch((err) => {
                console.error(err);
                return [] as TradingPairProps[];
            });
           
            //exclude delisted trading pairs and sort alphabetically
            setTradingPairs(pairs.filter((pair) => pair.status !== "delisted")
                            .sort((a: {base_currency: string}, b: {base_currency: string}) => a.base_currency.localeCompare(b.base_currency))
            );
        };

        apiCall();
    }, []);

    useEffect(() => {
        window.history.pushState(null, '', `?product=${selectedTradePair}`);
    }, [selectedTradePair]);

    const handleSelectedTradePairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTradePair((prev) => {
            if (prev === e.target.value) {
                return prev;
            } else {
                return e.target.value;
            }
        });
    }

    
    return { 
        tradingPairs,
        selectedTradePair,
        handleSelectedTradePairChange,
        tickers
    };
}

export default useTradingPairs;