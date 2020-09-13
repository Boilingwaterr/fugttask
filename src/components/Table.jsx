import React, { useEffect, useState } from 'react';
import Preloader from './preloader/Preloader';
import Style from './Table.module.css';

const Table = ({ setSwitcher, sort, data, setInit, isInit, list, newFieldList, concatLists }) => {

    const [isDescending, setIsDescending] = useState(false);
    const [description, setDescription] = useState(false);

    useEffect(() => {
        !!newFieldList.length && concatLists(newFieldList);
    }, [newFieldList, concatLists]);

    const sortHandler = _type => {
        setSwitcher(false);
        setIsDescending(!isDescending);
        sort(data, _type, isDescending);
    }

    const descriptionHandler = data => {
        setDescription(<div className={Style.description}>
            Выбран пользователь <b>{`${data.firstName} ${data.lastName}`}</b>
            Описание:
            <textarea readOnly value={data.description}>
            </textarea>
            Адрес проживания: <b>{data.address?.streetAddress}</b>
            Город: <b>{data.address?.city}</b>
            Провинция/штат: <b>{data.address?.state}</b>
            Индекс: <b>{data.address?.zip}</b>
        </div>)
    }

    let tableBody;
    if (data) {
        tableBody = data?.map((item, index) => {
            return (
                <div
                    key={index}
                    className={Style.tableItem}
                    onClick={() => descriptionHandler(item)}
                >
                    <div className={Style.id}>
                        {item.id}
                    </div>
                    <div className={Style.firstName}>
                        {item.firstName}
                    </div>
                    <div className={Style.lastName}>
                        {item.lastName}
                    </div>
                    <div className={Style.email}>
                        {item.email}
                    </div>
                    <div className={Style.phone}>
                        {item.phone}
                    </div>
                </div>
            )
        });
    }

    useEffect(() => {
        setTimeout(() => {
            !!list.length && setInit(true);
        }, 1500)
    }, [list, setInit]);

    const rect = <div className={isDescending ? Style.rectDescending : Style.rectAscending}></div>

    if (!isInit) {
        return <Preloader />
    } else {
        return (
            <>
                <div className={Style.tableWrapper}>
                    <div className={Style.header}>
                        <div
                            className={Style.id}
                            onClick={() => sortHandler('id')}>
                            <p>id</p>
                            {rect}
                        </div>
                        <div
                            className={Style.firstName}
                            onClick={() => sortHandler('firstName')}>
                            <p>first name</p>
                            {rect}
                        </div>
                        <div
                            onClick={() => sortHandler('lastName')}
                            className={Style.lastName}>
                            <p>last name</p>
                            {rect}
                        </div>
                        <div
                            onClick={() => sortHandler('email')}
                            className={Style.email}>
                            <p>email</p>
                            {rect}
                        </div>
                        <div
                            onClick={() => sortHandler('phone')}
                            className={Style.phone}>
                            <p>phone</p>
                            {rect}
                        </div>
                    </div>
                    <div className={Style.body}>
                        {tableBody}
                    </div>
                </div>
                {description}
            </>
        )
    }

}

export default Table;