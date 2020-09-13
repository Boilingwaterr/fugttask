import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setFirstName, setId, setLastName, setPhone, setEmail } from '../redux/addFormReducer';
import { addNewField } from '../redux/rootReducer';
import Style from './AddForm.module.css';

const AddForm = props => {

    const {
        setAddMode, setFirstName, setId, addFormReducer,
        setLastName, setPhone, setEmail, addNewField, setSwitcher
    } = props;

    const { idValue, firstNameValue, lastNameValue, emailValue, phoneValue } = addFormReducer;

    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        idValue && firstNameValue && lastNameValue && emailValue && phoneValue && setIsFilled(true);
        return () => {
            setIsFilled(false);
        };
    }, [idValue, firstNameValue, lastNameValue, emailValue, phoneValue]);

    const submitHandler = e => {
        setSwitcher(true)
        e.preventDefault();
        addNewField({ idValue, firstNameValue, lastNameValue, emailValue, phoneValue });
        setAddMode(false);
    }

    return <>
        <form className={Style.AddForm} onSubmit={submitHandler}>
            <div className={Style.header}>
                <h3>Заполните все поля</h3>
            </div>
            <div className={Style.inputWrapper}>
                <input
                    type="number" placeholder="id" value={addFormReducer.idValue}
                    onChange={(e) => setId(e.currentTarget.value)}
                />
                <input
                    type="text" placeholder="first name" value={addFormReducer.firstNameValue}
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                />
                <input type="text" placeholder="last name" value={addFormReducer.lastNameValue}
                    onChange={(e) => setLastName(e.currentTarget.value)}
                />
                <input type="email" placeholder="email" value={addFormReducer.emailValue}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <input type="tel" placeholder="phone"
                    pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                    value={addFormReducer.phoneValue}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                />
            </div>
            <div className={Style.buttonWrapper}>
                <div className={Style.backButton} onClick={() => setAddMode(false)}>Назад</div>
                {isFilled &&
                    <button className={Style.submitButton} type='submit'>Добавить в таблицу</button>
                }
            </div>
        </form>

    </>
}
const mapStateToProps = state => ({ addFormReducer: state.addFormReducer });

export default connect(mapStateToProps, {
    setFirstName, setId, setLastName, setPhone, setEmail, addNewField
})(AddForm);