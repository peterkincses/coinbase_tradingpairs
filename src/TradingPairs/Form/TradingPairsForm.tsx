import { TradingPairProps } from '../../types/TradingPairTypes';
import Select from 'react-select';

interface TradingPairsFormProps {
    handleSelectedTradePairChange: any;
    tradingPairs: any;
    selectedTradePair: any;
}

const TradingPairsForm = ({handleSelectedTradePairChange, tradingPairs, selectedTradePair}:TradingPairsFormProps) => {
    
    if (tradingPairs.length === 0) return null;

    const options = tradingPairs.map((product: TradingPairProps) => (
        {value: product.id, label: product.display_name}
    ));

    return (
        <form className="trade-pair-form">
            <div>
                <label htmlFor="product">Select a trading pair:</label>
                <Select
                    defaultValue={{ value: selectedTradePair, label: selectedTradePair }}
                    options={options}
                    onChange={handleSelectedTradePairChange}
                />
            </div>
        </form>
    );
}

export default TradingPairsForm;