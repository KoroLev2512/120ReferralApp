
import { Link } from 'react-router-dom'
import s from './style.module.scss'
import icon from '../img/header_icon.svg'

export default  function Header () {
    
    return(
        
        <header className={s.header}>
            
            <Link to={''} className={s.header__consel}>
            Cancel
            </Link>

            <p className={s.header__title}>
            120’ Creators Club
            </p>

            <img src={icon} alt="img" className={s.header__btn} />

        </header>

    )

}