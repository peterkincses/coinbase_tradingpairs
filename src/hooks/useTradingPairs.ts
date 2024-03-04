import React, {useState, useEffect} from 'react';
import {
    TRADING_PAIRS_API,
    TICKERS_SOCKET_URL,
    DEFAULT_TRADING_PAIR
} from '../constants';
import { TradingPairProps, lastJsonMessageProps } from '../types/TradingPairTypes';
import useWebSocket, { ReadyState } from 'react-use-websocket';


const useTradingPairs = () => {

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(TICKERS_SOCKET_URL, {});
    const [tradingPairs, setTradingPairs] = useState<TradingPairProps[]>([]);
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    const [selectedTradePair, setSelectedTradePair] = useState(productParam || DEFAULT_TRADING_PAIR);
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

    //subscribe to websocket messaging for the selected trading pair
    useEffect(() => {
        if (!selectedTradePair || readyState !== ReadyState.OPEN) {
            return;
        }

        let msg = {
            type: "subscribe",
            product_ids: [selectedTradePair],
            channels: ["matches"]
        };
        sendJsonMessage(msg);
    }, [selectedTradePair, readyState]);

    //set tickers to the last 50 messages for the selected trading pair
    useEffect(() => {
        let lastMessage = lastJsonMessage as lastJsonMessageProps;
        
        if (typeof lastMessage !== undefined && 
            (lastMessage?.type === "match" || lastMessage?.type === "last_match") &&
            parseFloat(lastMessage.price) > 0
        ) {
            setTickers((prev) => {
                return (prev as any).concat(lastJsonMessage)
                               .sort((a: any, b: any) => (b.trade_id || 0) - (a.trade_id || 0))
                               .slice(0, 50);
            });
        }
    }, [lastJsonMessage]);

    //update the selected trading pair, reset the message history and tickers 
    //and send a websocket message to unsubscribe from the previous trading pair
    const handleSelectedTradePairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTradePair((prev) => {
            if (prev === e.target.value) {
                return prev;
            } else {
                setMessageHistory([]);
                setTickers([]);

                let unsubscribeMsg = {
                    type: "unsubscribe",
                    product_ids: [prev],
                    channels: ["matches"]
                };    

                sendJsonMessage(unsubscribeMsg);

                return e.target.value;
            }
        });
    }

    
    return { 
        tradingPairs,
        selectedTradePair,
        handleSelectedTradePairChange,
        tickers,
        loading: readyState !== ReadyState.OPEN
    };
}

export default useTradingPairs;