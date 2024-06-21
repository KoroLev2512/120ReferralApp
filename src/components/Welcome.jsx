import Header from './Header'
import s from './style.module.scss'

import cub from '../img/cub.svg'

export default  function Welcome () {
    
    return(
        
        <div className={s.container}>
            
            <Header />

            <div className={s.app}>
                
                <div className={s.app__titles}>
                    
                    <p className={s.app__titles__title}>
                    Hello there!
                    </p>

                    <p className={s.app__titles__subtitle}>
                    We’re just about to begin
                    </p>

                </div>

                <img src={cub} alt="cub" className={s.cub} />

                <div className={s.app__footer}>
                    
                   <p className={s.app__titles__title}>
                   We love what you do
                    </p>

                    <p className={s.app__titles__subtitle}>
                    Among 120Block community the creativity
                    and self-expression is appreciated
                    </p>

                <button className={s.app__btn}>
                Begin
                </button>

                </div>

            

            </div>

        </div>

    )

}