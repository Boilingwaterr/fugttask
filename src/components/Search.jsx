import React, { useEffect } from 'react';
import Style from './Search.module.css';

const Search = ({ inputValue, setInputValue, filter,
    list, divideList, filtered, pageSize, setSwitcher }) => {

    const submitHandler = () => {
        setSwitcher(true);
        filter(list, inputValue);
    }

    useEffect(() => {
        filtered && divideList(filtered, pageSize);
    }, [filtered, divideList, pageSize]);

    return (
        <div className={Style.searchForm}>
            <input
                type="text"
                className={Style.searchInput}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.currentTarget.value);

                }}
                placeholder='Поиск'
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        submitHandler();
                    }
                }}
            />
            <div
                className={Style.searchIcon}
                onClick={submitHandler}
            >O--</div>
        </div>
    )
}

export default Search;