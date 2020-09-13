const SET_LIST = 'paginator/SET_LIST';
const SET_CURRENT_PAGE = 'paginator/SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'paginator/SET_TOTAL_COUNT';

const initialState = {
    currentPage: 1,
    pageSize: 50,
    totalRowsCount: 0,
    listPortion: []
}

export const paginatorReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_LIST:
            return {
                ...state, listPortion: action.data
            };
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.data
            };
        case SET_TOTAL_COUNT:
            return {
                ...state, totalRowsCount: action.data
            };
        default:
            return state;
    }
}

const setList = data => ({ type: SET_LIST, data });
const setCurrentPage = data => ({ type: SET_CURRENT_PAGE, data });
export const setTotalRowsCount = data => ({ type: SET_TOTAL_COUNT, data });

export const pageChanger = pageNumber => {

    return async dispatch => {
        dispatch(setCurrentPage(pageNumber));
    }
}

const divide = (arr, size) => {
    let newArr = [];
    for (let i = 0; i < Math.ceil(arr.length / size); i++) {
        newArr[i] = arr.slice((i * size), (i * size) + size);
    }
    return newArr;
}

export const divideList = (arr, size) => {
    return dispatch => {
        if (!!arr) {
            const newArr = divide(arr, size);
            dispatch(setList(newArr));
        }
    }
}

