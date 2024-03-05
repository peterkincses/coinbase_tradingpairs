import React, {useState, useEffect, useRef} from 'react';
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
    const messageHistoryRef = useRef(messageHistory);

    useEffect(() => { messageHistoryRef.current = messageHistory })

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
                            .sort((
                                   a: {base_currency: string}, 
                                   b: {base_currency: string}
                                  ) => a.base_currency.localeCompare(b.base_currency)
                            )
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
    }, [selectedTradePair, readyState, sendJsonMessage]);

    //set tickers to the last 50 messages for the selected trading pair
    useEffect(() => {
        let lastMessage = lastJsonMessage as lastJsonMessageProps;
        
        if (lastMessage !== null && 
            (lastMessage?.type === "match" || lastMessage?.type === "last_match") &&
            parseFloat(lastMessage.price) > 0
        ) {
            setMessageHistory((prev) => {
                const filtered = (prev as any).filter((p: any) => p.product_id === lastMessage.product_id);
                return filtered.concat(lastJsonMessage)
                               .sort((a: any, b: any) => (b.trade_id || 0) - (a.trade_id || 0))
                               .slice(0, 50);
            });
        }
    }, [lastJsonMessage]);

    //update the tickers every second instead of on every message
    useEffect(() => {
        const updateTickers = setInterval(() => {
            setTickers(messageHistoryRef.current);
        }, 1000);
        return () => {
            clearInterval(updateTickers);
        };
    }, []);

    //update the selected trading pair, reset the message history and tickers 
    //and send a websocket message to unsubscribe from the previous trading pair
    const handleSelectedTradePairChange = ({value}: {value: string}) => {
        setSelectedTradePair((prev) => {
            if (prev === value) {
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

                return value;
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