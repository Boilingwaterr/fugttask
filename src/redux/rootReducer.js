import { api } from './../api/api.js';
// import { array } from './arr.js';

const SET_DATA = 'root/SET_DATA';
const SET_ERROR = 'root/SET_ERROR';
const SET_INPUT_VALUE = 'root/SET_INPUT_VALUE';
const SET_FILTERED = 'root/SET_FILTERED';
const ADD_FIELD = 'root/ADD_FIELD';
const SET_SORTED = 'root/SET_SORTED';
const SET_INIT = 'root/SET_INIT';
const CONCAT_LISTIS = 'root/CONCAT_LISTIS';
const CLEAR_ERROR = 'root/CLEAR_ERROR';

const initialState = {
    isInit: false,
    isLoading: false,
    list: [],
    inputValue: '',
    filtered: null,
    sortedList: null,
    newFieldList: [],
    error: null
}

export const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_INIT:
            return {
                ...state, isInit: action.data
            };
        case SET_DATA:
            return {
                ...state, list: action.data
            };
        case SET_ERROR:
            return {
                ...state, error: action.data
            };
        case SET_INPUT_VALUE:
            return {
                ...state, inputValue: action.data
            };
        case SET_FILTERED:
            return {
                ...state, filtered: action.data
            };
        case ADD_FIELD:
            const newField = [action.data, ...state.newFieldList];
            return {
                ...state, newFieldList: newField
            };
        case CONCAT_LISTIS:
            const clone = [...state.list];
            if (!!action.data) {
                clone.splice(0, action.data.length - 1, ...action.data);
            }
            return {
                ...state, list: clone
            };
        case SET_SORTED:
            return {
                ...state, sortedList: action.data
            };
        case CLEAR_ERROR:
            return {
                ...state, error: null
            };
        default:
            return state;
    }
}

export const setInit = data => ({ type: SET_INIT, data });
export const clearError = () => ({ type: CLEAR_ERROR });
export const setInputValue = data => ({ type: SET_INPUT_VALUE, data });
export const setData = data => ({ type: SET_DATA, data });
export const concatLists = data => ({ type: CONCAT_LISTIS, data });

const setSorted = data => ({ type: SET_SORTED, data });
const setFiltered = data => ({ type: SET_FILTERED, data });
const setError = data => ({ type: SET_ERROR, data });
const addField = data => ({ type: ADD_FIELD, data });

export const addNewField = (data = {}) => {
    return async dispatch => {
        const field = {
            id: data.idValue,
            firstName: data.firstNameValue,
            lastName: data.lastNameValue,
            email: data.emailValue,
            phone: data.phoneValue
        }
        await dispatch(addField(field));
    }
}

export const filter = (arr, options) => {
    return async dispatch => {
        let filtered = await arr.filter(item => {
            if (item.id.toString().toLowerCase().includes(options.toLowerCase())) {
                return true;
            } else if (item.firstName.toLowerCase().includes(options.toLowerCase())) {
                return true;
            } else if (item.lastName.toLowerCase().includes(options.toLowerCase())) {
                return true;
            } else if (item.email.toLowerCase().includes(options.toLowerCase())) {
                return true;
            } else if (item.phone.toLowerCase().includes(options.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        })
        dispatch(setFiltered(filtered));
    }
}

export const sort = (arr, sortBy, isDescending) => {
    return dispatch => {
        const result = _sorting(arr, sortBy, isDescending);
        dispatch(setSorted(result))
    }
}

export const getSmallDataThunk = () => {
    return async dispatch => {
        const result = await api.getSmallData();
        if (result.message === "Something went wrong. Pleae try again later.") {
            dispatch(setError(result));
        }
        dispatch(setData(result));

    }
}

export const getBigDataThunk = () => {
    return async dispatch => {
        const result = await api.getBigData();
        if (result.message === "Something went wrong. Pleae try again later.") {
            dispatch(setError(result));
        }
        dispatch(setData(result));
    }
}

function _sorting(arr, sortBy, isDescending) {
    return arr.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
            if (isDescending) {
                return 1;
            }
            return -1;
        } else if (a[sortBy] > b[sortBy]) {
            if (isDescending) {
                return -1;
            }
            return 1;
        }
        return 0;
    })
}