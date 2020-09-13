import React, { useState } from 'react';
import Style from './Paginator.module.css';

const Paginator = props => {

    const { totalRowsCount, pageSize, onPageChanged, currentPage, setSwitcher } = props;

    const [portionNumber, setPortionNumber] = useState(1);

    let portionSize = 5;
    let totalPagesCount = Math.ceil(totalRowsCount / pageSize);
    let portionCount = Math.ceil(totalPagesCount / portionSize);
    let leftBorder = (portionNumber - 1) * portionSize + 1;
    let rightBorder = portionNumber * portionSize;
    let pages = [];

    for (let i = 1; i <= totalPagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={Style.paginator} >
            <div className={Style.doubleArrow} >
                <span
                    onClick={() => { setPortionNumber(1) }}
                    className={Style.leftArrowtoEnd}>
                </span>
            </div>
            {
                (portionNumber > 1) &&
                <span onClick={() => { setPortionNumber(portionNumber - 1) }} >
                    <div className={Style.leftArrow} ></div>
                </span>
            }
            {
                pages.filter(page => page >= leftBorder && page <= rightBorder)
                    .map(page => {
                        return (
                            <span
                                key={page}
                                className={(currentPage === page) ? Style.currentPage : undefined}
                                onClick={() => { onPageChanged(page); setSwitcher(true) }}>
                                {page}
                            </span>
                        )
                    })
            }
            {
                (portionCount > portionNumber) &&
                <span onClick={() => { setPortionNumber(portionNumber + 1) }}>
                    <span className={Style.rightArrow}></span>
                </span>
            }
            <div className={Style.doubleArrow} >
                <span
                    onClick={() => { setPortionNumber(totalPagesCount / portionSize) }}
                    className={Style.rightArrowtoEnd}>
                </span>
            </div>
        </div>
    )
}

export default Paginator;