import React from 'react';
import Style from './Error.module.css';

const Error = props => {
    return <div className={Style.errorWrapper}>
        <h1>Error</h1>
        <h2>{props.error.message}</h2>
    </div>
}

export default Error;