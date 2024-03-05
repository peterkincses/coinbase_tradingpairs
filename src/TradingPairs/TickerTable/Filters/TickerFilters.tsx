interface FilterProps {
    filterValues: string[];
    filter: string | null | undefined;
    handleFilterClick: (filterValue: string) => void;

}

const TickerFilters = ({filterValues, filter, handleFilterClick}: FilterProps) => {

    if (!filterValues) return null;

    return (
        <div className="button-group">
            {filterValues.map((filterValue: any) => {
                const handleClick = () => handleFilterClick(filterValue);
                return (
                    <button key={filterValue} onClick={handleClick} 
                            className={filter === filterValue ? 'active': ''}>
                        {filterValue.toUpperCase()}
                    </button>
                );
            })}
        </div>
    );
}

export default TickerFilters;