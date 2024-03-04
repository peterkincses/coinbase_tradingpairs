interface FilterProps {
    sideValues: string[];
    side: string | null | undefined;
    handleFilterClick: (sideValue: string) => void;

}

const TickerFilters = ({sideValues, side, handleFilterClick}: FilterProps) => {

    if (!sideValues) return null;

    return (
        <div className="button-group">
            {sideValues.map((sideValue) => {
                const handleClick = () => handleFilterClick(sideValue);
                return (
                    <button key={sideValue} onClick={handleClick} 
                            className={side === sideValue ? 'active': ''}>
                        {sideValue.toUpperCase()}
                    </button>
                );
            })}
        </div>
    );
}

export default TickerFilters;