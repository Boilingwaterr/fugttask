import React from 'react';
import Style from './Preloader.module.css'

const Preloader = () => {
    return <div className={Style.preloader} >
        <div className={Style.preloaderContent} >
            <div className={Style.preloaderFirst}></div>
            <div className={Style.preloaderSecond}></div>
            <div className={Style.preloaderThird}></div>
        </div>
    </div>
}

export default Preloader;