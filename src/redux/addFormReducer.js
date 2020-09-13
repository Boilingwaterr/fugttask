const SET_FIRST_NAME = 'addForm/SET_FIRST_NAME';
const SET_LAST_NAME = 'addForm/SET_LAST_NAME';
const SET_ID = 'addForm/SET_ID';
const SET_EMAIL = 'addForm/SET_EMAIL';
const SET_PHONE = 'addForm/SET_PHONE';

const initialState = {
    idValue: '',
    firstNameValue: '',
    lastNameValue: '',
    emailValue: '',
    phoneValue: '+7(922)2222222'
}

export const addFormReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_FIRST_NAME:
            let newFirstName;
            if (action.data) {
                newFirstName = action.data[0]?.toUpperCase().trim() + action.data.slice(1).trim();
            } else {
                newFirstName = action.data;
            }

            return {
                ...state, firstNameValue: newFirstName
            };
        case SET_LAST_NAME:
            let newLastName;
            if (action.data) {
                newLastName = action.data[0]?.toUpperCase().trim() + action.data.slice(1).trim();
            } else {
                newLastName = action.data;
            }
            return {
                ...state, lastNameValue: newLastName
            };
        case SET_ID:
            return {
                ...state, idValue: action.data
            };
        case SET_EMAIL:
            return {
                ...state, emailValue: action.data
            };
        case SET_PHONE:
            return {
                ...state, phoneValue: action.data
            };
        default:
            return state;
    }
}


export const setFirstName = data => ({ type: SET_FIRST_NAME, data });
export const setLastName = data => ({ type: SET_LAST_NAME, data });
export const setId = data => ({ type: SET_ID, data });
export const setEmail = data => ({ type: SET_EMAIL, data });
export const setPhone = data => ({ type: SET_PHONE, data });


