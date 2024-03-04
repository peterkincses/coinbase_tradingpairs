

interface TradingPairProps {
    id: string;
    base_currency: string;
    quote_currency: string;
    base_min_size: string;
    base_max_size: string;
    quote_increment: string;
    display_name: string;
    margin_enabled: boolean;
    status: string;
    status_message: string;
    min_market_funds: string;
    max_market_funds: string;
    post_only: boolean;
    limit_only: boolean;
    cancel_only: boolean;
    trading_disabled: boolean
}

interface lastJsonMessageProps {
    maker_order_id: string;
    price: string;
    product_id: string;
    sequence: number;
    side: string;
    size: string;
    taker_order_id: string;
    time: string;
    trade_id: number;
    type: string;
}

export type { 
    TradingPairProps, 
    lastJsonMessageProps
}