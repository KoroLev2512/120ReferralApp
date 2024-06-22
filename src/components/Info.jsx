import Header from './Header'
import s from './style.module.scss'

import infbg from '../img/info_bg.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import ProgressBar from './ProgressBar';

export default  function Info () {

    const [progress, setProgress] = useState(25);
    
    return(
        
        <div className={s.container}>
            
            <Header />

            <div className={s.app}>
                
                <div className={s.app__titles}>
                    
                    <p className={s.app__titles__title}>
                    120Block
                    </p>

                    <p className={s.app__titles__subtitles}>
                    Is a brand inspired by
                    street culture and creativity
                    </p>

                </div>

                <img src={infbg} alt="cub" className={s.infbg} />

                <ProgressBar progress={progress} />

                <div className={s.app__footer}>

                    <p className={s.app__titles__subtitle}>
                    We strive with love to create a bold style that can turn ambition into reality!
                    </p>

                <Link to={'/subtitles'} className={s.app__btn}>
                Next
                </Link>

                </div>

            

            </div>

        </div>

    )

}