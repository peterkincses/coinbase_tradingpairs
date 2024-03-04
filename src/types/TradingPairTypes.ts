

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
}

export type { 
    TradingPairProps, 
    lastJsonMessageProps
}